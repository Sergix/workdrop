<template>
  <main class="flex items-center max-w-2xl">
    <transition :name="transition" mode="out-in">
      <component
        :is="currentFormSection"
        class="my-auto"
        @continue="nextStep"
        @back="previousStep"
      ></component>
    </transition>

    <toast ref="errorToast" title="Uh oh!" icon="error">
      We couldn't create the assignment. Refresh and try again.
    </toast>
    <toast ref="creatingToast" title="Uploading" type="info" icon="info">
      We're sending over your assignment. Sit tight!
    </toast>
  </main>
</template>

<script>
import RequestFormAssignmentName from '@/components/form/RequestFormAssignmentName'
import RequestFormStudents from '@/components/form/RequestFormStudents'
import RequestFormMessage from '@/components/form/RequestFormMessage'
import RequestFormEmail from '@/components/form/RequestFormEmail'
import RequestFormReview from '@/components/form/RequestFormReview'
import Toast from '@/components/base/toast'

const FORM_STEPS = [
  'RequestFormAssignmentName',
  'RequestFormStudents',
  'RequestFormMessage',
  'RequestFormEmail',
  'RequestFormReview',
]

export default {
  name: 'RequestPage',
  components: {
    RequestFormAssignmentName,
    RequestFormStudents,
    RequestFormMessage,
    RequestFormEmail,
    RequestFormReview,
    Toast,
  },
  data() {
    return {
      currentStep: 0,
      transition: 'slide-left',
    }
  },
  computed: {
    currentFormSection() {
      return FORM_STEPS[this.currentStep]
    },
  },
  methods: {
    nextStep() {
      this.transition = 'slide-left'
      // submit form once it reaches the end of the form
      if (this.currentStep === FORM_STEPS.length - 1) {
        this.submitRequest()
      } else {
        this.currentStep++
      }
    },
    previousStep() {
      this.transition = 'slide-right'
      if (this.currentStep !== 0) {
        this.currentStep--
      }
    },
    submitRequest() {
      this.$refs.creatingToast.open()

      this.$stitchApp
        .callFunction('createRequest', [
          {
            name: this.$store.state.request.assignmentName,
            request_emails: this.$store.state.request.students.map(
              (student) => student.email
            ),
            message: this.$store.state.request.message,
            email: this.$store.state.request.email,
          },
        ])
        .then((response) => {
          this.$store.commit('request/clear')
          this.$router.push({
            path: `/submit?token=${response.newRequest.token}&accessor=${response.newRequest.accessor}`,
          })
        })
        .catch((error) => {
          this.$sentry.captureException(error)
          this.$refs.errorToast.open()
        })
    },
  },
  head() {
    return {
      title: 'Request / workdrop',
    }
  },
}
</script>
