<template>
  <Form
    title="Add your students!"
    description="Enter your students' emails."
    back-button
    @continue="verifyEmails"
    @back="$emit('back')"
  >
    <h2 class="text-xl font-medium">Student Emails</h2>
    <ul class="mt-2">
      <li
        v-for="(student, index) in students"
        :key="index"
        class="flex flex-row mt-2"
      >
        <img
          v-show="students.length > 1"
          src="@/assets/svg/minus-circle.svg"
          class="mr-2 cursor-pointer"
          @click="removeStudent(index)"
        />
        <EmailInput
          :value="student.email"
          placeholder="student email"
          class="w-full my-auto"
          @input="editStudent(index, $event)"
          @validate="setStudentValid(index, $event)"
        />
      </li>
    </ul>
    <Button type="small" class="ml-auto mt-4 mb-4" @click="addStudent">
      ADD ANOTHER
    </Button>
    <toast ref="errorNotification" title="Invalid Email" icon="error">
      Please double-check that all emails are correct.
    </toast>
    <toast ref="limitNotification" title="Student Limit" icon="error">
      Sorry, but workdrop currently only supports adding up to 20 students per
      assignment.
    </toast>
  </Form>
</template>

<script>
import Form from '@/components/base/form'
import EmailInput from '@/components/imported/EmailInput'
import Button from '@/components/base/button'
import Toast from '@/components/base/toast'

export default {
  name: 'RequestFormStudents',
  components: {
    Form,
    EmailInput,
    Button,
    Toast,
  },
  computed: {
    students: {
      get() {
        return this.$store.state.request.students
      },
      set(value) {},
    },
  },
  methods: {
    addStudent() {
      if (this.students.length >= 20) {
        this.$refs.limitNotification.open()
        return
      }

      this.$store.commit('request/addStudent', '')
    },
    editStudent(index, newEmail) {
      this.$store.commit('request/editStudent', { index, newEmail })
    },
    removeStudent(index) {
      this.$store.commit('request/removeStudent', { index })
    },
    setStudentValid(index, valid) {
      this.$store.commit('request/setStudentValid', { index, valid })
    },
    verifyEmails() {
      for (const student in this.$store.state.request.students) {
        if (this.$store.state.request.students[student].valid === false) {
          this.$refs.errorNotification.open()
          return
        }
      }

      this.$emit('continue')
    },
  },
}
</script>
