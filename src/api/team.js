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

// 팀 수정하기
function editTeam(teamData) {
  return instance.patch('teams', teamData);
}

// 팀 삭제하기
function deleteTeam(id) {
  return instance.delete(`teams/${id}`);
}

export { getTeams, createTeam, editTeam, deleteTeam };
