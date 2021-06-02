import { getInstanceWithAuth } from '@/api/index';

const instance = getInstanceWithAuth();

// 팀 리스트 요청
function teamList() {
  return instance.get('teams');
}

export { teamList };
