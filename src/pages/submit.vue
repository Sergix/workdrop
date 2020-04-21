<template>
  <main class="container px-8">
    <div v-show="submitting">
      <h1 class="text-3xl mb-2 leading-none">Submit your assignment</h1>
      <section>
        <h2 class="text-xl font-medium">Assignment Name</h2>
        <p class="ml-4">{{ assignmentName }}</p>
      </section>
      <section>
        <h2 class="text-xl font-medium">Message</h2>
        <p class="ml-4">{{ message }}</p>
      </section>
      <client-only>
        <file-pond />
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
      <Button class="mt-8" type="secondary" @click="downloadAll">
        DOWNLOAD ALL
      </Button>
    </div>

    <toast
      ref="errorToast"
      text-color="background"
      background-color="error"
      title="Upload Failed"
      icon="error"
    >
      Uh oh! Your file could not be uploaded.
    </toast>
    <toast
      ref="accessErrorToast"
      text-color="background"
      background-color="error"
      title="Query Failed"
      icon="error"
    >
      Uh oh! We couldn't access your submissions. Refresh and try again.
    </toast>
    <toast
      ref="submitAccessErrorToast"
      text-color="background"
      background-color="error"
      title="Query Failed"
      icon="error"
    >
      Uh oh! We couldn't find the request. Refresh and try again.
    </toast>
  </main>
</template>

<script>
import { BSON } from 'mongodb-stitch-browser-sdk'
import { AwsRequest } from 'mongodb-stitch-browser-services-aws'
import vueFilePond, { setOptions } from 'vue-filepond'
import { putObject } from '@/util/s3'
import Toast from '@/components/base/toast'
import Button from '@/components/base/button'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

const MAX_FILE_SIZE = 25 // megabytes

const convertBytesToMegabytes = (bytes) => {
  return bytes / 1024 / 1024
}

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
    if (this.$route.query.accessor) {
      submissionsCollection
        .find({
          token: this.$route.query.token,
        })
        .toArray()
        .then((result) => (this.submissions = result))
        .catch(() => this.$refs.accessErrorToast.open())

      requestsCollection
        .findOne({
          token: this.$route.query.token,
        })
        .then((result) => {
          this.requestCount = result.request_emails.length
        })
        .catch(() => this.$refs.accessErrorToast.open())
    }

    // if we are submitting, get the request info
    if (this.$route.query.email) {
      requestsCollection
        .findOne({
          token: this.$route.query.token,
        })
        .then((result) => {
          this.message = result.message
          this.assignmentName = result.name
        })
        .catch(() => this.$refs.accessErrorToast.open())
    }

    setOptions({
      server: {
        // haven't had time to refactor this code yet, and frankly don't want to, it
        // worringly seems very delicate
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          if (convertBytesToMegabytes(file.size) > MAX_FILE_SIZE) {
            error('File size too large')
          }

          const reader = new FileReader()

          reader.onload = (e) => {
            const fileData = new Uint8Array(reader.result)
            const fileBson = new BSON.Binary(fileData)

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
                this.$stitchApp
                  .callFunction('createSubmission', [
                    {
                      token: this.token,
                      email: this.$route.query.email,
                      filename: file.name,
                      url: result.ETag,
                    },
                  ])
                  .then(() => {
                    this.$router.push({ path: '/success' })
                    load(putObjectArgs.Key)
                  })
                  .catch(() => {
                    this.$refs.errorToast.open()
                  })
              })
              .catch(() => {
                this.$refs.errorToast.open()
              })
          }

          reader.readAsArrayBuffer(file)

          // cancel methods for FilePond
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
    downloadSubmission(index) {},
    downloadAll() {},
  },
  middleware: ['token'],
}
</script>
