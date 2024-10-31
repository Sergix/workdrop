<template>
  <Form
    title="What's the assignment?"
    description="Enter the name of the assignment."
    @continue="validateName"
  >
    <Input v-model="assignmentName" maxlength="100" />
    <toast ref="errorNotification" title="Empty Name" icon="error">
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
