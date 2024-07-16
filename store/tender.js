export const state = () => ({
  tender: null,
  translateList: [],
})

export const mutations = {
  addTranslateList(state, val) {
    state.translateList.push(val)
  },
  setProgress( state, {taskId, progress}) {
    state.translateList.find(item => item.taskId === taskId).progress = progress;
  }
}
export const actions = {
  addTranslateList({ commit, state }, val) {
    commit('addTranslateList', val)
  },
  startProgressTimer({ commit }, taskId) {
    const timer = setInterval(async () => {
      const res = await this.$axios.get(`/translate/status/${taskId}`);
      const progress = res.data.progress;
      if (progress < 100) {
        commit('setProgress', { taskId, progress });
      } else {
        clearInterval(timer);
        commit('setProgress', { taskId, progress });
      }
    }, 2000);
    return timer;
  },

  setProgress({ commit, dispatch }, taskId) {
    dispatch('startProgressTimer', taskId)
  },
  nuxtClientInit({ dispatch, state }) {
    state.translateList.forEach(item => {
      if (item.progress < 100) {
        dispatch('startProgressTimer', item.taskId);
      }
    });
  },
}
export const getters = {
  getTranslateList(state) {
    return state.translateList;
  },
}

// const translate
