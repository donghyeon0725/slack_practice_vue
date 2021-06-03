import { getInstanceWithAuth } from '@/api/index';

const instance = getInstanceWithAuth();

// 보드 리스트 요청
function getBoards(id) {
  return instance.get(`board/${id}`);
}

// 보드 생성
function createBoard(boardData) {
  return instance.post('board', boardData);
}

export { getBoards, createBoard };
