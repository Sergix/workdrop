export const state = () => ({
  assignmentName: '',
  students: [{ email: '', valid: false }],
  message: '',
  email: '',
})

export const mutations = {
  addStudent(state, email) {
    state.students.push({ email: '', valid: false })
  },
  editStudent(state, { index, newEmail }) {
    state.students[index].email = newEmail
  },
  setStudentValid(state, { index, valid }) {
    state.students[index].valid = valid
  },
  removeStudent(state, email) {
    state.students.splice(state.students.indexOf(email), 1)
  },
  setAssignmentName(state, assignmentName) {
    state.assignmentName = assignmentName
  },
  setEmail(state, email) {
    state.email = email
  },
  setMessage(state, message) {
    state.message = message
  },
  clear(state) {
    state.assignmentName = ''
    state.students = [{ email: '', valid: false }]
    state.message = ''
    state.email = ''
  },
}
