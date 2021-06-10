import { getInstanceWithAuth, getInstance } from '@/api/index';

const instance = getInstanceWithAuth();
const instanceWithNoAuth = getInstance();

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

// 팀 초대하기
function inviteTeam(teamId, email) {
  return instance.get(`teams/invite/${teamId}/${email}`);
}

// 팀 초대 수락하기
function acceptInvite(email, token) {
  return instanceWithNoAuth.patch(
    'teams/join',
    { email: email },
    {
      headers: {
        'X-AUTH-TOKEN': token,
      },
    },
  );
}

// 팀 멤버 불러오기
function getTeamMember(teamId) {
  return instance.get(`teams/members/${teamId}`);
}

export {
  getTeams,
  createTeam,
  editTeam,
  deleteTeam,
  inviteTeam,
  acceptInvite,
  getTeamMember,
};
