const mutations = {
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
  setBoards(state, list) {
    state.page.boards = list;
  },
  clearBoards(state) {
    state.page.boards = [];
  },
  setTeams(state, list) {
    state.page.teams = list;
  },
  clearTeams(state) {
    state.page.teams = [];
  },
  setCards(state, list) {
    state.page.cards = list;
  },
  addCard(state, card) {
    state.page.cards.push(card);
  },
  deleteCard(state, card) {
    state.page.cards = state.page.cards.filter(s => s.id != card.id);
  },
  updateCard(state, card) {
    let cards = state.page.cards;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id == card.id) {
        cards.splice(i, 1, card);
        break;
      }
    }
  },
  clearCards(state) {
    state.page.cards = [];
  },
  setMembers(state, list) {
    state.page.members = list;
  },
  clearMembers(state) {
    state.page.members = [];
  },
  setFilterWord(state, string) {
    state.page.filterWord = string;
  },
  clearFilterWord(state) {
    state.page.filterWord = '';
  },
};

export default mutations;
