// loads the mongodb stitch client

import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
import { AwsServiceClient } from 'mongodb-stitch-browser-services-aws'

export default async ({ app }, inject) => {
  const APP_ID = 'workdrop-kdezt'

  const stitchApp = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID)

  const stitchUser = await stitchApp.auth.loginWithCredential(
    new AnonymousCredential()
  )

  const s3client = stitchApp.getServiceClient(
    AwsServiceClient.factory,
    's3-submissions'
  )

  inject('stitchApp', stitchApp)
  inject('stitchUser', stitchUser)
  inject('s3client', s3client)
}
