<template>
  <main class="flex items-center max-w-2xl">
    <fade-transition>
      <component
        :is="currentFormSection"
        class="my-auto"
        @continue="nextStep"
        @back="previousStep"
      ></component>
    </fade-transition>

    <toast
      ref="errorToast"
      text-color="background"
      background-color="error"
      title="Uh oh!"
      icon="error"
    >
      We couldn't create the assignment. Refresh and try again.
    </toast>
  </main>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import RequestFormAssignmentName from '@/components/form/RequestFormAssignmentName'
import RequestFormStudents from '@/components/form/RequestFormStudents'
import RequestFormMessage from '@/components/form/RequestFormMessage'
import RequestFormReview from '@/components/form/RequestFormReview'
import Toast from '@/components/base/toast'

const FORM_STEPS = [
  'RequestFormAssignmentName',
  'RequestFormStudents',
  'RequestFormMessage',
  'RequestFormReview',
]

export default {
  name: 'RequestPage',
  components: {
    FadeTransition,
    RequestFormAssignmentName,
    RequestFormStudents,
    RequestFormMessage,
    RequestFormReview,
    Toast,
  },
  data() {
    return {
      currentStep: 0,
    }
  },
  computed: {
    currentFormSection() {
      return FORM_STEPS[this.currentStep]
    },
  },
  methods: {
    nextStep() {
      // submit form once it reaches the end of the form
      if (this.currentStep === FORM_STEPS.length - 1) {
        this.submitRequest()
      } else {
        this.currentStep++
      }
    },
    previousStep() {
      if (this.currentStep !== 0) {
        this.currentStep--
      }
    },
    submitRequest() {
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
        .catch(() => this.$refs.errorToast.open())
    },
  },
}
</script>
