require('dotenv').config()

export default {
  mode: 'spa',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'application-name', content: 'workdrop' },
      { name: 'theme-color', content: '#FAFAFA' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },

      { name: 'twitter:card', content: 'workdrop' },
      { name: 'twitter:url', content: 'https://www.workdrop.app/' },
      { name: 'twitter:title', content: 'workdrop' },
      {
        name: 'twitter:description',
        content: 'An assignment requesting app for teachers and educators.',
      },

      { property: 'og:title', content: 'workdrop' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.workdrop.app/' },
      { property: 'og:image', content: 'https://www.workdrop.app/ogimage.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'me', type: 'text/html', href: 'https://www.sergix.net/' },
      { rel: 'me', href: 'mailto:sergix@sergix.net' },
      { rel: 'dns-prefetch', href: '//workdrop.app/' },
      { rel: 'preconnect', href: 'https://www.workdrop.app/' },
      { rel: 'prefetch', href: 'https://www.workdrop.app/' },
      { rel: 'prerender', href: 'https://workdrop.app/' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#121212' },

  css: ['@/assets/css/tthoves.css'],

  plugins: ['@/plugins/stitch'],

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/svg',
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
  ],

  tailwindcss: {
    configPath: '@@/tailwind.config.js',
  },

  axios: {},

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  srcDir: 'src/',

  dotenv: {
    path: '.',
  },

  server: {
    host: process.env.DEV_HOST || 'localhost',
    port: process.env.DEV_PORT || '3000',
  },

  sentry: {
    dsn:
      'https://2cee25412690421ea9708a6d3262a6b0@o337155.ingest.sentry.io/5209791',
    config: {},
  },

  sitemap: {
    hostname: 'https://workdrop.app',
    gzip: true,
    exclude: ['/submit', '/success'],
  },
}
