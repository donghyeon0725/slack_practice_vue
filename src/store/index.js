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
} from '@/util/cookie';
import { login } from '@/api/auth';
import { getTeams } from '@/api/team';
import { getBoards } from '@/api/board';
import { getCards } from '@/api/card';

/**
 * vuex를 사용합니다.
 * */
Vue.use(Vuex);

/* 페이지 정보를 객체가 아닌, 메소드로 만듬으로써, 페이지를 리로드 할 때에 쿠키 데이터를 계속 조회할 수 있도록 변경 */
const PAGE_DATA = () => {
  return {
    boards: [],
    teams: [],
    cards: [],
  };
};

export default new Vuex.Store({
  state: {
    email: getUserEmailFromCookie() || '',
    token: getAuthFromCookie() || '',
    page: PAGE_DATA(),
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

    /* 분리 */
    setBoards(state, value) {
      state.page.boards = value;
    },
    clearBoards(state) {
      state.page.boards = [];
    },
    setTeams(state, value) {
      state.page.teams = value;
    },
    clearTeams(state) {
      state.page.teams = [];
    },
    setCards(state, value) {
      state.page.cards = value;
    },
    clearCards(state) {
      state.page.cards = [];
    },
  },
  actions: {
    async login({ commit }, userData) {
      // 로그인을 수행해서, 토큰을 받아온다.
      const response = await login(userData);

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
    /* 필요한 값을 페이지 정보의 특정 키워드로 저장 해둡니다. */
    setTeams({ commit }, list) {
      commit('setTeams', list || []);
    },
    setBoards({ commit }, list) {
      commit('setBoards', list || []);
    },
    setCards({ commit }, list) {
      commit('setCards', list || []);
    },
    async refreshTeamsAndEmptyOther(context) {
      let teams = (await getTeams()).data;

      context.commit('setTeams', teams);
      context.commit('clearBoards');
      context.commit('clearCards');
    },
    async refreshOnlyBoards(context, teamId) {
      let boards = (await getBoards(teamId)).data;

      console.log(boards);
      context.commit('setBoards', boards);
    },
    async refreshOnlyCards(context, boardId) {
      let cards = (await getCards(boardId)).data;

      console.log(cards);
      context.commit('setCards', cards);
    },
    async refreshOnlyTeams(context) {
      let teams = (await getTeams()).data;

      context.commit('setTeams', teams);
    },
    async refreshSetting(context, teamId) {
      let teams = (await getTeams()).data;

      if (this.$isNotEmpty(teamId)) {
        let boards = (await getBoards(teamId)).data;

        context.commit('setTeams', teams);
        context.commit('setBoards', boards);
      }
    },
  },
});
