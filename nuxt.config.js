require('dotenv').config()

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
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

      { name: 'twitter:card', content: 'workdrop' },
      { name: 'twitter:url', content: 'https://www.workdrop.app/' },
      { name: 'twitter:title', content: 'workdrop' },
      {
        name: 'twitter:description',
        content: 'An assignment requesting app for teachers and educators.',
      },
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
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/tthoves.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/stitch'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/svg',
  ],
  tailwindcss: {
    configPath: '@@/tailwind.config.js',
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
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
}
