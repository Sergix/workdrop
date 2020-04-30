exports = function({ name, email, request_emails, message }) {
  if (!name || !request_emails || !email) {
    return
  }

  const { token, accessor } = context.functions.execute('generateToken')

  const requestsCollection = context.services
    .get('atlas-cluster0')
    .db('workdrop')
    .collection('requests')

  const newRequest = {
    token,
    accessor,
    name,
    email,
    request_emails,
    message,
    timestamp: new Date(),
  }
  requestsCollection
    .insertOne(newRequest)
    .then((result) =>
      console.log(
        `Successfully inserted request with _id: ${result.insertedId}`
      )
    )
    .catch((err) => console.error(`Failed to insert request: ${err}`))

  return { newRequest }
}

/*

  example usage

  exports({
    name: 'English Homework',
    email: 'sergix7440@gmail.com',
    request_emails: ['sergix@outlook.com', 'sergix7440@gmail.com'],
    message: 'Hello world!'
  })

*/
