<template>
  <main class="container px-8 max-w-2xl">
    <div v-show="submitting">
      <h1 class="text-3xl leading-none font-semibold">
        Submit your assignment
      </h1>
      <section class="mt-4">
        <h2 class="text-xl font-medium">Assignment Name</h2>
        <p class="ml-4">{{ assignmentName }}</p>
      </section>
      <section class="mt-2">
        <h2 class="text-xl font-medium">Message</h2>
        <p class="ml-4">{{ message }}</p>
      </section>
      <client-only>
        <file-pond class="mt-8" />
      </client-only>
    </div>

    <div v-show="accessing">
      <h1 class="text-3xl mb-2 font-semibold leading-none">Submissions</h1>
      <p class="text-sm italic">
        {{ requestCount - submissions.length }} submissions remaining
      </p>
      <ul>
        <li
          v-for="(submission, index) in submissions"
          :key="submission.email"
          class="mt-6"
        >
          <h2 class="text-xl font-medium">{{ submission.email }}</h2>
          <p class="text-sm italic">{{ submission.filename }}</p>
          <Button
            type="primary"
            class="mt-2"
            @click="downloadSubmission(index)"
          >
            DOWNLOAD
          </Button>
        </li>
      </ul>
      <p v-show="submissions.length === 0" class="mt-8">No submissions yet!</p>
      <Button class="mt-8" type="secondary" @click="downloadAll">
        DOWNLOAD ALL
      </Button>
    </div>

    <!-- all notifications -->
    <toast ref="errorToast" title="Upload Failed" icon="error">
      Uh oh! Your file could not be uploaded.
    </toast>
    <toast ref="accessErrorToast" title="Query Failed" icon="error">
      Uh oh! We couldn't access your submissions. Refresh and try again.
    </toast>
    <toast ref="submitAccessErrorToast" title="Query Failed" icon="error">
      Uh oh! We couldn't find the request. Refresh and try again.
    </toast>
    <toast ref="downloadErrorToast" title="Query Failed" icon="error">
      Uh oh! We couldn't download the submission. Refresh and try again.
    </toast>
  </main>
</template>

<script>
import { BSON } from 'mongodb-stitch-browser-sdk'
import { AwsRequest } from 'mongodb-stitch-browser-services-aws'
import vueFilePond, { setOptions } from 'vue-filepond'
import { putObject, downloadBlob } from '@/util/s3'
import Toast from '@/components/base/toast'
import Button from '@/components/base/button'

const FilePond = vueFilePond()

const MAX_FILE_SIZE = 25 // megabytes

const convertBytesToMegabytes = (bytes) => bytes / 1024 / 1024

export default {
  name: 'SubmitPage',
  components: {
    FilePond,
    Toast,
    Button,
  },
  data() {
    return {
      token: this.$route.query.token,
      accessing: this.$route.query.accessor || false,
      submitting: this.$route.query.email || false,
      submissions: [],
      assignmentName: '',
      message: '',
      requestCount: 0,
    }
  },
  mounted() {
    const requestsCollection = this.$stitchDb.collection('requests')
    const submissionsCollection = this.$stitchDb.collection('submissions')

    // if we are accessing submissions, get all current submissions and
    // the original request
    //
    // accessing state is determined by whether the accessor token exists in the
    // URL, which has already been validated by the token middleware
    if (this.accessing) {
      submissionsCollection
        .find({
          token: this.$route.query.token,
        })
        .toArray()
        .then((result) => (this.submissions = result))
        .catch((error) => {
          this.$sentry.captureException(error)
          this.$refs.accessErrorToast.open()
        })

      requestsCollection
        .findOne({
          token: this.token,
        })
        .then((result) => {
          this.requestCount = result.request_emails.length
        })
        .catch((error) => {
          this.$sentry.captureException(error)
          this.$refs.accessErrorToast.open()
        })
    }

    // if we are submitting, get the assignment information
    //
    // submitting state is determined by whether the URL has a valid token and email,
    // determined by the token middleware
    if (this.submitting) {
      requestsCollection
        .findOne({
          token: this.$route.query.token,
        })
        .then((result) => {
          this.message = result.message
          this.assignmentName = result.name
        })
        .catch((error) => {
          this.$sentry.captureException(error)
          this.$refs.accessErrorToast.open()
        })
    }

    setOptions({
      server: {
        // haven't had time to refactor this code yet, and frankly don't want to, it
        // worringly seems very delicate
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          if (convertBytesToMegabytes(file.size) > MAX_FILE_SIZE) {
            error('File size too large')
            return
          }

          const reader = new FileReader()

          reader.onload = (e) => {
            const fileData = new Uint8Array(reader.result)
            const fileBson = new BSON.Binary(fileData)

            // Key = filename
            //
            // file name example:
            // f0bcdfdc-e53e-4592-a4a1-0e885a318540-example.jpeg
            const putObjectArgs = {
              Body: fileBson,
              Key: `${this.token}-${file.name}`,
              ContentType: file.type,
              ...putObject,
            }

            const request = new AwsRequest.Builder()
              .withService('s3')
              .withAction('PutObject')
              .withRegion('us-east-1')
              .withArgs(putObjectArgs)

            this.$s3client
              .execute(request.build())
              .then((result) => {
                return this.$stitchApp.callFunction('createSubmission', [
                  {
                    token: this.token,
                    email: this.$route.query.email,
                    filename: file.name,
                    url: result.ETag,
                  },
                ])
              })
              .then(() => {
                this.$router.push({ path: '/success' })
                load(putObjectArgs.Key)
              })
              .catch((error) => {
                this.$sentry.captureException(error)
                this.$refs.errorToast.open()
              })
          }

          reader.readAsArrayBuffer(file)

          // cancel method for FilePond
          return {
            abort: () => {
              abort()
            },
          }
        },
      },
    })
  },
  methods: {
    downloadSubmission(index) {
      const filename = this.submissions[index].filename
      const getObjectArgs = {
        Bucket: 'workdrop-submissions',
        Key: `${this.token}-${filename}`,
      }

      // create a fake link to click and trigger the browser download of the file
      const link = document.createElement('a')
      link.style.display = 'none'
      document.body.appendChild(link)

      const request = new AwsRequest.Builder()
        .withService('s3')
        .withAction('GetObject')
        .withRegion('us-east-1')
        .withArgs(getObjectArgs)

      // application/octet-stream is for any generic binary stream
      this.$s3client
        .execute(request.build())
        .then((result) => {
          downloadBlob(result.Body.buffer, filename, 'application/octet-stream')
        })
        .catch((error) => {
          this.$sentry.captureException(error)
          this.$refs.downloadErrorToast.open()
        })
    },
    downloadAll() {
      this.submissions.forEach((submission, index) => {
        this.downloadSubmission(index)
      })
    },
  },
  middleware: ['token'],
  head() {
    return {
      title: 'Submit / workdrop',
    }
  },
}
</script>
