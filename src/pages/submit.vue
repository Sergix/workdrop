<template>
  <main class="container p-16">
    <client-only>
      <file-pond />
    </client-only>
    <output>{{ uploadState }}</output>
  </main>
</template>

<script>
import { BSON } from 'mongodb-stitch-browser-sdk'
import { AwsRequest } from 'mongodb-stitch-browser-services-aws'
import vueFilePond, { setOptions } from 'vue-filepond'
import { putObject } from '@/util/s3'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

const UPLOAD_STATES = {
  initial: '',
  fileTooLarge: 'File cannot be greater than 25MB.',
  reading: 'Reading file...',
  uploading: 'Uploading submission...',
  uploaded: 'Submission uploaded!',
  uploadError: 'Upload failed!',
}

const MAX_FILE_SIZE = 25 // megabytes

const convertBytesToMegabytes = (bytes) => {
  return bytes / 1024 / 1024
}

export default {
  name: 'SubmitPage',
  components: {
    FilePond,
  },
  data() {
    return {
      token: this.$route.query.token,
      uploadState: UPLOAD_STATES.initial,
    }
  },
  mounted() {
    setOptions({
      server: {
        // haven't had time to refactor this code yet, and frankly don't want to, it
        // worringly seems very delicate
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          if (convertBytesToMegabytes(file.size) > MAX_FILE_SIZE) {
            error(UPLOAD_STATES.fileTooLarge)
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
                console.log(result.ETag)
                load(putObjectArgs.Key)
              })
              .catch((err) => {
                console.error(err)
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
  middleware: ['token'],
}
</script>
