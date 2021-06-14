import { getAuthFromCookie, getUserEmailFromCookie } from '@/util/cookie';

const PAGE_DATA = () => {
  return {
    boards: [],
    teams: [],
    cards: [],
    members: [],
    filterWord: '',
  };
};

const state = {
  email: getUserEmailFromCookie() || '',
  token: getAuthFromCookie() || '',
  page: PAGE_DATA(),
};

export default state;
