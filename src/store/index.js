import Vue from 'vue';
import Vuex from 'vuex';
import {
  saveAuthToCookie,
  saveUserEmailToCookie,
  getAuthFromCookie,
  getUserEmailFromCookie,
  deleteCookie,
  // getJsonValueFromCookie,
  // deleteJsonValueFromCookie,
  getJsonFromCookie,
  saveJsonToCookie,
} from '@/util/cookie';
import { login } from '@/api/auth';

/**
 * vuex를 사용합니다.
 * */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: getUserEmailFromCookie() || '', // username 이라는 값을 어디에서든 사용할 수 있게 되었다.
    token: getAuthFromCookie() || '',
    page: getJsonFromCookie() || {},
  },
  mutations: {
    // 첫번째 인자로 state 를 받아야 한다.
    setLoginEmail(state, email) {
      state.email = email;
    },
    clearLoginEmail(state) {
      state.email = '';
    },
    clearLoginToken(state) {
      state.token = '';
    },
    setToken(state, token) {
      state.token = token;
    },
    setPage(state, json) {
      state.json = json;
    },
    clearPage(state) {
      state.json = {};
    },
  },
  getters: {
    // 첫번째 인자로 state 를 받아야 한다.
    isLogin(state) {
      return state.email !== '';
    },
    getPageInfo(state) {
      return state.page;
    },
  },
  actions: {
    async login({ commit }, userData) {
      // 로그인을 수행해서, 토큰을 받아온다.
      const response = await login(userData);
      console.log(response);

      // 커밋 작업으로 store에 값을 세팅한다. (또는 쿠키로 저장해두고 페이지를 리로드 처리한다)
      commit('setToken', response.data);
      commit('setLoginEmail', userData.email);

      // 쿠기로 저장한다.
      saveAuthToCookie(response.data);
      saveUserEmailToCookie(userData.email);

      return response;
    },
    logout({ commit }) {
      commit('clearLoginEmail');
      commit('clearLoginToken');

      deleteCookie('til_auth');
      deleteCookie('til_user');
    },
    addPageInfo({ commit }, json) {
      let keys = Object.keys(json);

      for (let key of keys) {
        saveJsonToCookie(key, json[keys]);
      }

      commit('setPage', getJsonFromCookie());
    },
  },
});
