export const state = () => ({
  userId: 1,
})
export const getters = {
  getUserStatus(state) {
    return state.userId;
  },
}
