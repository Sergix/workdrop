# Workdrop Changelog

## v0.1.1

- fix font sizing for large screens
- fix iPad style responsiveness (`md` to `lg` styling rules)
- fix FilePond uploader styling
- add lite-server for production testing (`yarn serve:prod`)
- fix navbar item border styling
  - all non-purgeable styling will now be placed in `donotpurge.css`
- adjust styling for `EmailInput`
- fix background color styling for `toast`s
- edit `error.svg`, remove fill
- fix request form transitions
- fix mobile index image flexbox
- add global page transitions

## Alpha v0.1.0 Release

- initialized Nuxt.js project
- moved source files to `src/` and added configuration to `nuxt.config.js`
- installed `node-sass` for Sass styling integration
- added `dotenv` and configured development server to load setup from `.env`
- added `mongodb-stitch-browser-sdk`
- added `mongodb-stitch-browser-services-aws`
- added `filepond` and `vue-filepond`
- created file upload handler on `submit` page
- created request form and request uploader
- created submission download form and downloader
- created help, about, privacy policy, and terms pages
- added icons and meta information
- pushed for release!
