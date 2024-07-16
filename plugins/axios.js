import pageCode from '~/enums/pageCodes';

export default function ({ $axios, redirect, store }) {
  // 请求拦截
  $axios.onRequest((config) => {
    const token = store.getters.getToken;
    if (token) {
      config.headers.Authorization = token;
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
