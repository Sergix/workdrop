<template>
  <Form
    title="Review your assignment..."
    description="Double-check and make sure all the information
you entered is accurate, then click or press “Send Assignment“!"
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
      <h2 class="text-xl font-medium">Your Email</h2>
      <p class="ml-4 mt-2">
        {{ email }}
      </p>
    </section>
    <Button type="primary" class="mt-8 md:ml-auto" @click="$emit('continue')">
      SEND ASSIGNMENT
    </Button>
  </Form>
</template>

<script>
import Form from '@/components/base/form'
import Button from '@/components/base/button'

export default {
  name: 'RequestFormAssignmentName',
  components: {
    Form,
    Button,
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
    email() {
      return this.$store.state.request.email
    },
  },
}
</script>
