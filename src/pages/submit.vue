<template>
  <main class="container p-16">
    <no-ssr>
      <file-pond />
    </no-ssr>
    <output>{{ uploadState }}</output>
  </main>
</template>

<script>
import { AwsRequest } from 'mongodb-stitch-browser-services-aws'
import { vueFilePond } from 'vue-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { putObject, readFile } from '@/util/s3'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond(FilePondPluginImagePreview)

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
  methods: {
    onFileUpload(file) {
      convertBytesToMegabytes(file.size) > MAX_FILE_SIZE
        ? (this.uploadState = UPLOAD_STATES.fileTooLarge)
        : this.s3Upload(file)
    },

    async s3Upload(file) {
      this.uploadState = UPLOAD_STATES.reading

      const fileData = await readFile(file)

      this.uploadState = UPLOAD_STATES.uploading

      const putObjectArgs = {
        Body: fileData,
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
          this.uploadState = UPLOAD_STATES.uploaded
        })
        .catch((err) => {
          console.error(err)
          this.uploadState = UPLOAD_STATES.uploadError
        })
    },
    middleware: ['token'],
  },
}
</script>
