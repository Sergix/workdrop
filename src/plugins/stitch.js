// loads the mongodb stitch client

import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk'
import { AwsServiceClient } from 'mongodb-stitch-browser-services-aws'

export default async ({ app }, inject) => {
  const APP_ID = 'workdrop-kdezt'

  const stitchApp = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID)

  const stitchUser = await stitchApp.auth.loginWithCredential(
    new AnonymousCredential()
  )

  const stitchDb = stitchApp
    .getServiceClient(RemoteMongoClient.factory, 'atlas-cluster0')
    .db('workdrop')

  const s3client = stitchApp.getServiceClient(
    AwsServiceClient.factory,
    's3-submissions'
  )

  inject('stitchApp', stitchApp)
  inject('stitchUser', stitchUser)
  inject('stitchDb', stitchDb)
  inject('s3client', s3client)
}
