<template>
  <Form
    title="Enter your email"
    description="We'll send you a link to a page where you can access submissions."
    back-button
    @continue="validateEmail"
    @back="$emit('back')"
  >
    <EmailInput
      v-model="email"
      class="w-full my-auto"
      @validate="validated = $event"
    />
    <toast ref="errorNotification" title="Invalid Email" icon="error">
      Please double-check that your email is correct.
    </toast>
  </Form>
</template>

<script>
import Form from '@/components/base/form'
import Toast from '@/components/base/toast'
import EmailInput from '@/components/imported/EmailInput'

export default {
  name: 'RequestFormEmail',
  components: {
    Form,
    Toast,
    EmailInput,
  },
  data() {
    return {
      validated: false,
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.request.email
      },
      set(value) {
        this.$store.commit('request/setEmail', value)
      },
    },
  },
  methods: {
    validateEmail() {
      if (!this.validated) {
        this.$refs.errorNotification.open()
      } else {
        this.$emit('continue')
      }
    },
  },
}
</script>
