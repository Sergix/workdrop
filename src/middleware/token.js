export default function(context) {
  if (!context.query.token) {
    return context.redirect('/')
  }

  const requestsCollection = context.app.$stitchDb.collection('requests')
  const dbQuery = {
    token: context.query.token,
  }

  requestsCollection
    .findOne(dbQuery)
    .then((result) => {
      if (!result) {
        return context.redirect('/')
      }
    })
    .catch((err) => console.error(err))
}
