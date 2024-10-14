export const state = () => ({
  token: null, // 用户信息 id
  loginStatus: false,
})
export const mutations = {
  setToken(state, val) {
    state.token = val;
  },
  setLoginStatus(state, status) {
    state.loginStatus = status;
  },
}
export const actions = {
  setToken({commit}, val) {
    commit('setToken', val)
  },
  // 检查token是否过期
  checkToken({ commit, state }) {
    const token = state.token;
    if (token) {
      // 验证 token 是否过期的逻辑
      // 例如通过一个 API 请求来验证 token
      this.$axios.get('/api/check-token', {
        headers: {
          Authorization: token
        }
      })
        .then(() => {
          commit('setToken', token);
          commit('setLoginStatus', true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          commit('setToken', null);
          commit('setLoginStatus', false);
        });
    }
  }
}
export const getters = {
  isLoggedIn(state) {
    return state.loginStatus
  },

  getToken(state) {
    return state.token;
  },

}
