import Vue from 'vue';
import Vuex from 'vuex';

/**
 * vuex를 사용합니다.
 * */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '', // username 이라는 값을 어디에서든 사용할 수 있게 되었다.
  },
  mutations: {
    // 첫번째 인자로 state 를 받아야 한다.
    setLoginEmail(state, email) {
      state.email = email;
    },
    clearLogin(state) {
      state.email = '';
    },
  },
  getters: {
    // 첫번째 인자로 state 를 받아야 한다.
    isLogin(state) {
      return state.email !== '';
    },
  },
});
