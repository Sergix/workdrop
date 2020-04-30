exports = function({ token, email, filename, url }) {
  const submissionsCollection = context.services
    .get('atlas-cluster0')
    .db('workdrop')
    .collection('submissions')

  const newSubmission = {
    token,
    email,
    filename,
    url,
    timestamp: new Date(),
  }
  const result = submissionsCollection
    .insertOne(newSubmission)
    .then((result) => {
      console.log(
        `Successfully inserted submission with _id: ${result.insertedId}`
      )
      return result
    })
    .catch((err) => {
      console.error(`Failed to insert submission: ${err}`)
      return err
    })

  return { result }
}

/*
  example call

  exports({
    token: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    email: 'sergix7440@gmail.com',
    filename: 'hello.txt',
    url: ''
  })

*/
