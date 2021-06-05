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
  savewholeJsonToCookie,
} from '@/util/cookie';
import { login } from '@/api/auth';
import { getTeams } from '@/api/team';
import { getBoards } from '@/api/board';

/**
 * vuex를 사용합니다.
 * */
Vue.use(Vuex);

/* 페이지 정보를 객체가 아닌, 메소드로 만듬으로써, 페이지를 리로드 할 때에 쿠키 데이터를 계속 조회할 수 있도록 변경 */
const PAGE_DATA = () => {
  return {
    init: getJsonFromCookie()['init'] || false,
    boards: getJsonFromCookie()['boards'] || [],
    teams: getJsonFromCookie()['teams'] || [],
    selectedTeamIdx: getJsonFromCookie()['selectedTeamIdx'] || 0,
    selectedTeam: getJsonFromCookie()['selectedTeam'] || {},
    selectedBoardIdx: getJsonFromCookie()['selectedBoardIdx'] || -1,
    selectedBoard: getJsonFromCookie()['selectedBoard'] || {},
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
    setSelectedTeamIdx(state, value) {
      state.page.selectedTeamIdx = value;
    },
    clearSelectedTeamIdx(state) {
      state.page.selectedTeamIdx = 0;
    },
    setSelectedTeam(state, obj) {
      state.page.selectedTeam = obj;
    },
    clearSelectedTeam(state) {
      state.page.selectedTeam = {};
    },
    setInit(state, bool) {
      state.page.init = bool;
    },
    setSelectedBoardIdx(state, int) {
      state.page.selectedBoardIdx = int;
    },
    clearSelectedBoardIdx(state) {
      state.page.selectedBoardIdx = -1;
    },
    setSelectedBoard(state, obj) {
      state.page.selectedBoard = obj;
    },
    clearSelectedBoard(state) {
      state.page.selectedBoard = {};
    },
  },
  getters: {
    isLogin(state) {
      return state.email !== '';
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

      // 페이지 초기화 해야하는 상태로 setting
      commit('setInit', true);
      saveJsonToCookie('init', true);

      return response;
    },
    logout({ commit }) {
      commit('clearLoginEmail');
      commit('clearLoginToken');

      deleteCookie('til_auth');
      deleteCookie('til_user');
      deleteCookie('til_page');
    },
    /* 필요한 값을 페이지 정보의 특정 키워드로 저장 해둡니다. */
    setTeams({ commit }, list) {
      commit('setTeams', list || []);
      saveJsonToCookie('teams', list);
    },
    setBoards({ commit }, list) {
      commit('setBoards', list || []);
      saveJsonToCookie('boards', list);
    },
    setSelectedTeamIdx({ commit }, int) {
      commit('setSelectedTeamIdx', int || 0);
      saveJsonToCookie('selectedTeamIdx', int);
    },
    setSelectedTeam({ commit }, obj) {
      commit('setSelectedTeam', obj || {});
      saveJsonToCookie('selectedTeam', obj);
    },
    setSelectedBoardIdx({ commit }, int) {
      commit('setSelectedBoardIdx', int || -1);
      saveJsonToCookie('selectedBoardIdx', int);
    },
    setSelectedBoard({ commit }, obj) {
      commit('setSelectedBoard', obj || {});
      saveJsonToCookie('selectedBoard', obj);
    },
    initComplete({ commit }) {
      commit('setInit', false);
      saveJsonToCookie('init', false);
    },
    init({ commit }) {
      commit('setInit', false);
      commit('setTeams', []);
      commit('setBoards', []);
      commit('setSelectedTeamIdx', 0);
      commit('setSelectedTeam', {});
      commit('setSelectedBoardIdx', -1);
      commit('setSelectedBoard', {});

      const initConfig = {
        init: false,
        teams: [],
        boards: [],
        selectedTeamIdx: 0,
        selectedTeam: {},
        selectedBoardIdx: -1,
        selectedBoard: {},
      };

      savewholeJsonToCookie(initConfig);
    },
    async refreshSetting(context) {
      let teams = (await getTeams()).data;

      console.log(teams);

      if (teams.length > 0) {
        let selectedTeamIdx = this.state.page.selectedTeamIdx;
        let selectedTeam = teams[selectedTeamIdx];

        let boards = (await getBoards(selectedTeam.id)).data;
        let selectedBoardIdx = this.state.page.selectedBoardIdx;
        let selectedBoard = {};
        if (selectedBoardIdx != -1) selectedBoard = boards[selectedBoardIdx];

        context.commit('setInit', true);
        context.commit('setTeams', teams);
        context.commit('setSelectedTeam', selectedTeam);
        context.commit('setSelectedTeamIdx', selectedTeamIdx);
        context.commit('setBoards', boards);
        context.commit('setSelectedBoard', selectedBoard);
        context.commit('setSelectedBoardIdx', selectedBoardIdx);

        const initConfig = {
          init: false,
          teams: teams,
          boards: boards,
          selectedTeamIdx: selectedTeamIdx,
          selectedTeam: selectedTeam,
          selectedBoardIdx: selectedBoardIdx,
          selectedBoard: selectedBoard,
        };

        savewholeJsonToCookie(initConfig);
      } else {
        await context.dispatch('init', context);
      }
    },
  },
});
