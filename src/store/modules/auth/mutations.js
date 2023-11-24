export default {
  setUser(state, payload) {
    state.token = payload.token
    state.userName = payload.userId
    state.didAutoLogout = false
  },
  setAutoLogout(state) {
    state.didAutoLogout = true
  }
}