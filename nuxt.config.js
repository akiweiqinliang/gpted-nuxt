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
    script: [
      {
        hid: 'tawk',
        innerHtml: `
        <!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/668763dfeaf3bd8d4d18412e/1i20ds92o';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
        `,
        defer: true
      },
    ],
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
    '@/plugins/view-ui',
    '@/plugins/element-ui',
    '@/plugins/vue-dompurify-html',
    '@/plugins/click-outside',
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
        implementation: require('sass'),
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
}
