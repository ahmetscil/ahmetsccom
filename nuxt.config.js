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
  // loading: { color: '#3B8070' },
  css: [
  ],
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/vselect.js',
    { src: '~/plugins/smoth.js', ssr: false },
    { src: '~/plugins/scrollreveal.js', ssr: false },
    '~/plugins/lightGallery.client.js'
  ],
  loading: '~/components/Loading.vue',
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/google-fonts',
    // '@nuxtjs/html-validator',
    '@aceforth/nuxt-optimized-images'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-gtag',
    // '@nuxtjs/sitemap',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          file: 'en-US.js'
        }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: process.env.PARIETTE_SITE_LANG
    }],
    'nuxt-maintenance-mode',
    ['@nuxtjs/component-cache', {
      maxAge: 1000*60*60
    }],
    ['@nuxtjs/html-minifier', {
      log: 'once',
      logHtml: true
    }]
  ],
  'google-gtag': {
    id: process.env.GOOGLE_GTAG
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS
  },
  googleFonts: {
    families: {
      'Titillium+Web': {
        wght: [100, 200, 400, 600, 700, 900]
      },
      Nunito: {
        wght: [100, 200, 400, 600, 700, 900]
      },
    }
  },
  axios: {
    baseURL: process.env.PARIETTE_API_URL
  },
  pwa: {
    manifest: {
      lang: process.env.PARIETTE_SITE_LANG
    }
  },
  maintenance: {
    enabled: !!process.env.PARIETTE_MAINTENANCE,
    path: '/maintenance',
    matcher: /^\/admin/
  },
  optimizeImages: {
    optimizeImages: true
  },
  // sitemap: {
  //   xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  //   path: '/sitemap.xml',
  //   routes: async () => {
  //     const data = await axios.get(`${process.env.PARIETTE_API_URL}p/sitemap`)
  //     return data
  //   }
  // },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/'
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.PARIETTE_API_URL,
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          refresh: { url: 'auth/refresh', method: 'post' },
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/me', method: 'get' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      }
    }
  },
  toast: {
    position: 'bottom-left',
    duration: 5000
  },
  build: {
  }
}
