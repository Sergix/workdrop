// used most code from
// https://medium.com/@histechup/sending-emails-with-mongodb-stitch-and-sendgrid-b201a4ca38e9

/* example usage

  exports({
    fullDocument: {
      name: 'test',
      email: 'sergix7440@gmail.com',
      request_emails: ['sergix@outlook.com'],
      token: '12345',
      accessor: '123adf'
    }
  })

*/

exports = function(changeEvent) {
  console.log(
    `Running sendRequestEmails for [${changeEvent.fullDocument.name}]`
  )

  const sendGridApiUrl = 'https://api.sendgrid.com/v3/mail/send'
  const sendGridApiKey = context.values.get('SENDGRID_API_KEY')

  const assignmentRequest = changeEvent.fullDocument
  const assignmentName = assignmentRequest.name
  const requestEmails = assignmentRequest.request_emails
  const assignerEmail = assignmentRequest.email
  const token = assignmentRequest.token
  const accessor = assignmentRequest.accessor

  // "http://workdrop.app" protocol because of link branding issues
  // with SendGrid at the moment
  const baseUrl = 'http://workdrop.app/submit?'

  const assignerEmailTemplateId = '[REDACTED]'
  const requestEmailTemplateId = '[REDACTED]'

  // Send assigner email
  console.log(
    `Sending out assigner email to [${changeEvent.fullDocument.email}]`
  )

  const assignerEmailContent = {
    email: assignerEmail,
    link: buildApiEndpoint({ baseUrl, token, accessor }),
  }
  const assignerEmailBody = buildEmailData({
    recipientEmail: assignerEmail,
    substitutions: assignerEmailContent,
    template: assignerEmailTemplateId,
  })
  const assignerEmailResult = context.http
    .post(
      buildApiRequest({
        url: sendGridApiUrl,
        body: assignerEmailBody,
        apiKey: sendGridApiKey,
      })
    )
    .then((res) => {
      console.log(`ASSIGNER EMAIL SUCCESS [${res.statusCode}]`)
    })
    .catch((res) => {
      console.log(`ASSIGNER EMAIL ERROR [${res.statusCode}]`)
    })

  // Send request emails
  requestEmails.forEach((recipientEmail) => {
    console.log(`Sending out request email to [${recipientEmail}]`)

    const requestEmailContent = {
      requestEmail: recipientEmail,
      email: assignerEmail,
      assignment: assignmentName,
      link: buildApiEndpoint({ baseUrl, token, email: recipientEmail }),
    }
    const requestEmailBody = buildEmailData({
      recipientEmail,
      substitutions: requestEmailContent,
      template: requestEmailTemplateId,
    })

    context.http
      .post(
        buildApiRequest({
          url: sendGridApiUrl,
          body: requestEmailBody,
          apiKey: sendGridApiKey,
        })
      )
      .then((res) => {
        console.log(`REQUEST EMAIL SUCCESS [${res.statusCode}]`)
      })
      .catch((res) => {
        console.log(`REQUEST EMAIL ERROR [${res.statusCode}]`)
      })
  })

  return { assignerEmailResult }
}

function buildApiEndpoint({ baseUrl, ...queries }) {
  return Object.keys(queries)
    .reduce((url, query) => {
      return `${url}${query}=${queries[query]}&`
    }, baseUrl)
    .slice(0, -1)
}

function buildApiRequest({ url, body, apiKey }) {
  return {
    url,
    headers: { Authorization: [`Bearer ${apiKey}`] },
    body,
    encodeBodyAsJSON: true,
  }
}

function buildEmailData({ recipientEmail, substitutions, template }) {
  const senderEmail = 'no-reply@workdrop.app'

  const emailData = {
    personalizations: [
      {
        to: [
          {
            email: recipientEmail,
          },
        ],
        dynamic_template_data: substitutions,
      },
    ],
    from: {
      email: senderEmail,
    },
    template_id: template,
  }

  return emailData
}
