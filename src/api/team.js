import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// 인스턴스 요청
function getInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const instance = getInstance();

// 팀 리스트 요청
function teamList() {
  return instance.get('team');
}

export { teamList };
