export default {
  target: 'server',
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.PARIETTE_SITE_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f7f7f7' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com/' },
      { rel: 'stylesheet', type: 'text/css', href: '/fontawesome/css/all.min.css' }
    ]
  },
  head: {
    title: 'Sr. FullStack Developer Ahmet Selim ÇİL @ canvas teknoloji',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'yandex-verification', content: '07484414f3c85b68' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  axios: {},
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  build: {
  }
}
