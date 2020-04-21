export default function(context) {
  // possible query:
  //   /url?token=TOKEN&email=EMAIL
  // or
  //   /url?token=TOKEN&accessor=ACCESSOR
  //
  // redirect if:
  //  1. no token
  //  2. no accessor and no email
  //  3. accessor with email
  //  4. token, accessor, or email do not exist in the same request
  //  5. submission exists with token and email

  // case 1, 2, 3
  if (
    !context.query.token ||
    (!context.query.accessor && !context.query.email) ||
    (context.query.accessor && context.query.email)
  ) {
    return context.redirect('/')
  }

  // case 4
  const requestsCollection = context.app.$stitchDb.collection('requests')
  let requestQuery = {
    token: context.query.token,
  }

  if (context.query.accessor) {
    requestQuery = { accessor: context.query.accessor, ...requestQuery }
  } else if (context.query.email) {
    requestQuery = { request_emails: context.query.email, ...requestQuery }
  }

  requestsCollection
    .count(requestQuery)
    .then((result) => {
      if (!result) {
        return context.redirect('/')
      }
    })
    .catch(() => context.redirect('/'))

  // case 5
  const submissionsCollection = context.app.$stitchDb.collection('submissions')
  const submitQuery = {
    token: context.query.token,
    email: context.query.email,
  }

  if (context.query.email) {
    submissionsCollection
      .count(submitQuery)
      .then((result) => {
        if (result > 0) {
          return context.redirect('/success')
        }
      })
      .catch(() => context.redirect('/'))
  }
}
