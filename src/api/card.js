import { getInstanceWithAuth } from '@/api/index';

const instance = getInstanceWithAuth();

// 보드 리스트 요청
function getCards(boardId) {
  return instance.get(`card/${boardId}`);
}

// 카드 생성하기
function createCard(cardJsonData) {
  let form_data = new FormData();

  for (let key in cardJsonData) {
    form_data.append(key, cardJsonData[key]);
  }

  return instance.post('card', form_data);
}

// 카드 수정하기
function modifyCard(cardJsonData) {
  let form_data = new FormData();

  for (let key in cardJsonData) {
    form_data.append(key, cardJsonData[key]);
  }

  return instance.patch('card', form_data);
}

// 카드 삭제하기
function deleteCard(cardId) {
  return instance.delete(`card/${cardId}`);
}
export { getCards, createCard, modifyCard, deleteCard };
