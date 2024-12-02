import pageCode from '~/enums/pageCodes';

export default function ({ $axios, redirect, store, $i18n }) {
  // 请求拦截
  $axios.onRequest((config) => {
    const token = store.getters["user/getToken"];
    if (token) {
      config.headers.Authorization = token;
      // 请求头中添加当前页面语言类型
      // config.headers.lang = $i18n.lang;
    }
    return config;
  });
  // 响应拦截
  $axios.onResponse((res) => {
    // doing something...
    // if (res.data.code === 200) {
    //   return res;
    // }
  });
  // 错误拦截
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect({ name: pageCode.ERROR });
    }
  });
}
