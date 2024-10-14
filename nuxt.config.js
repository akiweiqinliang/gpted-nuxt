export default {
  env: {
    // BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
    BASE_URL: 'http://localhost:5000',
    NODE_ENV: process.env.NODE_ENV,
  },
  dev: process.env.NODE_ENV !== 'production',
  // Global page headers: https://go.nuxtjs.dev/config-head
  pageTransition: {
    name: 'fade',
    mode: 'out-in', // default
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },
  head: {
    title: 'gpted-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    __dangerouslyDisableSanitizers: ['script'],
    // script: [
    //   {
    //     hid: 'tawk',
    //     src: '/tawk.js',
    //     defer: true
    //   }
    // ],
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
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/theme/index.less', // 引入自定义主题文件
    '@/assets/styles/main.scss',
    '@/assets/styles/mediaQuery.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/axios',
      ssr: true, // 默认为true，会同时在服务端（asyncData（{$axios}））和客户端（this.$axios）同时拦截axios请求，设为false就只会拦截客户端
    },
    '@/plugins/view-ui',
    '@/plugins/element-ui',
    '@/plugins/vue-dompurify-html',
    '@/plugins/vue-directives',
    '@/plugins/persistedState.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: process.env.BASE_URL || 'https://test.gpted.cn/api/private/v1/',
    baseURL: 'http://localhost:5000'
  },
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
    defaultLocale: 'en',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'lang/',
    detectBrowserLanguage: {
      fallbackLocale: 'en',
      redirectOn: 'root',
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    vueI18n: {
      fallbackLocale: 'en',
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
          grid: false
        },
        // 'postcss-px-to-viewport': {
        //   viewportWidth: 1440, // PC端设计稿宽度
        //   // viewportHeight: 1080, // 可选，根据设计稿高度设置
        //   unitPrecision: 5, // px转换后保留的小数位数
        //   viewportUnit: 'vw', // 转换为视窗单位
        //   selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类
        //   minPixelValue: 1, // 小于或等于 1px 不转换为视窗单位
        //   mediaQuery: false, // 允许在媒体查询中转换px
        // },
        'postcss-pxtorem': {
          // rootValue: 16,
          unitPrecision: 5,
          propList: ['*', '!border*', '!max-width*'],
          selectorBlackList: ['.ignore', /^\.no-rem/],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
        },

      }
    },
    loaders: {
      scss: {
        implementation: require('sass'),
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
}
