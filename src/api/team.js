import { getInstanceWithAuth } from '@/api/index';

const instance = getInstanceWithAuth();

// 팀 리스트 요청
function getTeams() {
  return instance.get('teams');
}

// 팀 생성하기
function createTeam(teamData) {
  return instance.post('teams', teamData);
}

export { getTeams, createTeam };
