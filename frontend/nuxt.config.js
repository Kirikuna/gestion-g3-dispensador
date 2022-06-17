import colors from 'vuetify/es5/util/colors';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - frontend',
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { Name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', Name: 'description', content: '' },
      { Name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],

  auth: {
    strategies: {
      local: {
        token: { // For the token, only using cookies, not store
          required: false,
          type: false,
        },
        user: { // Data contains user info, but user is being set manually, next to register or login
          property: 'data.data.user',
        },
        endpoints: {
          login: { url: '/auth/signin', method: 'post', /*propertyName: 'token'*/ }, // Endpoint that nuxt/auth uses for login
          logout: false, // not using endpoints for logout, logout only deletes the token cookie
          user: false, // not using endpoints for fetch user info
        },
      },
    },
    redirect: {
      login: false,
      logout: false,
      callback: false,
      home: false,

    }
  },

  router: {
    middleware: ['auth'] // All pages (except pages that have auth: false) will require login for access
  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.HOST_API || 'http://localhost:9000/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '65AFFF',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  target: 'server',
};
