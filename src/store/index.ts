import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
        isLogin:window.sessionStorage.getItem('user') == null ? '0' : window.sessionStorage.getItem('user'),
        count:0
    }
  },
  mutations: {
    changeLogin(state, data) {
        state.isLogin = data;
        window.sessionStorage.setItem('user', data)
      },
      changeCount(state, data) {
          state.count = data;
      }
  }
})
