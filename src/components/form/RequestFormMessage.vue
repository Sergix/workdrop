<template>
  <Form
    title="Personalize your request."
    description="Type a custom message to send to your students
along with your assignment request."
    back-button
    @continue="$emit('continue')"
    @back="$emit('back')"
  >
    <Input v-model="message" maxlength="250" />
  </Form>
</template>

<script>
import Form from '@/components/base/form'
import Input from '@/components/base/input'

export default {
  name: 'RequestFormMessage',
  components: {
    Form,
    Input,
  },
  computed: {
    message: {
      get() {
        return this.$store.state.request.message
      },
      set(value) {
        this.$store.commit('request/setMessage', value)
      },
    },
  },
}
</script>
