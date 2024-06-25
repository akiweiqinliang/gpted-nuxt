export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'gpted-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'view-design/dist/styles/iview.css',
    '@/assets/styles/theme/index.less', // 引入自定义主题文件
    '@/assets/styles/main.scss',
    '@/assets/styles/mediaQuery.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/view-ui',
    '@/plugins/vue-dompurify-html',
    '@/plugins/click-outside',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
  ],

  modules: [
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh-CN.js',
      },
    ],
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'lang/',
    detectBrowserLanguage: {
      fallbackLocale: 'zh',
      redirectOn: 'root',
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    vueI18n: {
      fallbackLocale: 'zh',
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        autoprefixer: {
          // 指定目标浏览器
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8"
          ],
          grid: true
        },
        // 'postcss-pxtorem': {
        //   // rootValue: 16,
        //   unitPrecision: 5,
        //   propList: ['*', '!border*', '!max-width*'],
        //   selectorBlackList: ['.ignore', /^\.no-rem/],
        //   replace: true,
        //   mediaQuery: false,
        //   minPixelValue: 0,
        //   exclude: [/node_modules/]
        // },

      }
    },
    loaders: {
      scss: {
        implementation: require('sass')
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
}
