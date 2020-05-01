[![workdrop](.github/workdrop-logo-black.png)](https://www.workdrop.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ba5640d1-c75f-4d40-b165-6266ca29ce26/deploy-status)](https://app.netlify.com/sites/workdrop/deploys).

## A file request app for educators

Created for [#twiliohackathon](https://dev.to/devteam/announcing-the-twilio-hackathon-on-dev-2lh8)

Workdrop enables you to request any type of assignment from your students.

Simply enter the assignment name, your students' emails, and your email. No account creation required.

## Requirements

- yarn
- MongoDB Stitch instance
- Twilio SendGrid account

### Deploying to Stitch

[Instructions are here in the MongoDB docs on how to deploy this project's `stitch` directory to a MongoDB Stitch instance.](https://docs.mongodb.com/stitch/deploy/deploy-changes-with-stitch-cli/)

Next, create a MongoDB Atlas cluster named `cluster0` with collections `request` and `submissions`. If you wish to edit the cluster name, edit `stitch/services/atlas-cluster0/config.json`

Then, you need to [add your API keys using Secrets](https://docs.mongodb.com/stitch/deploy/deploy-changes-with-stitch-cli/) in the Stitch UI.

The required API keys are:

- `SENDGRID_API_KEY`
- `S3_ACCESS_KEY`

The S3 public key can be set in `stitch/services/s3-submissions/config.json`.

The S3 bucket should be named `workdrop-submissions` in AWS, but you can change this by editing the rules in `stitch/services/s3-submissions/rules`.

## Build Setup

Clone the repository

```bash
git clone https://github.com/sergix/workdrop
```

Install dependencies (yarn preferred)

```bash
yarn install
```

Then run the project locally:

```bash
yarn serve
```

### Optional configuration

#### Development Server

Create a `.env` file in the root directory containing your development server host and port (defaults to `localhost` on port `3000`)

.env

```env
DEV_HOST=localhost
DEV_PORT=3000
```

### Local development server

`yarn serve`
