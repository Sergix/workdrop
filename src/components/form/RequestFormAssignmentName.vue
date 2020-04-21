<template>
  <Form
    title="What's the assignment?"
    description="Enter the name of the assignment."
    @continue="validateName"
  >
    <Input v-model="assignmentName" />
    <toast
      ref="errorNotification"
      title="Empty Name"
      background-color="error-accessible"
      text-color="background"
      icon="error"
    >
      Please enter your assignment's name.
    </toast>
  </Form>
</template>

<script>
import Form from '@/components/base/form'
import Input from '@/components/base/input'
import Toast from '@/components/base/toast'

export default {
  name: 'RequestFormAssignmentName',
  components: {
    Form,
    Input,
    Toast,
  },
  computed: {
    assignmentName: {
      get() {
        return this.$store.state.request.assignmentName
      },
      set(value) {
        this.$store.commit('request/setAssignmentName', value)
      },
    },
  },
  methods: {
    validateName() {
      if (this.assignmentName === '') {
        this.$refs.errorNotification.open()
      } else {
        this.$emit('continue')
      }
    },
  },
}
</script>
