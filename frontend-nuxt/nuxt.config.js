const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'frontend-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css'}
    ]
  },
  css: [
    '@/assets/css/normalize.css',
    '@/assets/css/loading.css',
    '@/assets/css/loading-btn.css',
    '@/assets/scss/app.scss',
    '@/assets/scss/material-design-font-settings.scss',
    '@/assets/css/pure-css-modal/modal.css',

  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.plugins.push(
        new webpack.EnvironmentPlugin([
          'APIKEY',
          'AUTHDOMAIN',
          'DATABASEURL',
          'PROJECTID',
          'STORAGEBUCKET',
          'MESSAGINGSENDERID'
        ])
      )
    }
  },
  plugins: [
    '~/plugins/firebase',
    '~/plugins/auth',
    '~/plugins/fetch'
  ],
  watchers: {
    webpack: {
      poll: true
    }
  }
}

