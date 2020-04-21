<template>
  <Form
    title="Review your assignment..."
    description="Double-check and make sure all the information
you entered is accurate, then press “Send Request”
to request your assignment!"
    :continue-button="false"
    back-button
    @back="$emit('back')"
  >
    <section>
      <h2 class="text-xl font-medium">Assignment Name</h2>
      <p class="ml-4 mt-2">{{ assignmentName }}</p>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-medium">Student Emails</h2>
      <ul class="ml-4 mt-2">
        <li v-for="student in students" :key="student.email" class="mt-1">
          {{ student.email }}
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-medium">Personalized Message</h2>
      <p class="ml-4 mt-2">
        {{ message !== '' ? message : 'No message provided.' }}
      </p>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-medium">Your email</h2>
      <p class="text-sm italic mb-4">
        Your email will be used to send you a unique link to access your
        students’ submissions. We will never share it with anyone.
      </p>
      <EmailInput
        v-model="email"
        class="w-full"
        @validate="validated = $event"
      />
    </section>
    <Button type="primary" class="mt-8" @click="validateEmail">
      SEND ASSIGNMENT
    </Button>
    <toast
      ref="errorNotification"
      title="Invalid Email"
      background-color="error-accessible"
      text-color="background"
      icon="error"
    >
      Please double-check that your email is correct.
    </toast>
  </Form>
</template>

<script>
import Form from '@/components/base/form'
import Button from '@/components/base/button'
import Toast from '@/components/base/toast'
import EmailInput from '@/components/imported/EmailInput'

export default {
  name: 'RequestFormAssignmentName',
  components: {
    Form,
    Button,
    Toast,
    EmailInput,
  },
  data() {
    return {
      validated: false,
    }
  },
  computed: {
    assignmentName() {
      return this.$store.state.request.assignmentName
    },
    students() {
      return this.$store.state.request.students
    },
    message() {
      return this.$store.state.request.message
    },
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
