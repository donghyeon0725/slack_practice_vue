<template>
  <div>
    <div class="f-container">
      <div
        class="fit"
        :key="index"
        v-for="(card, index) in cards"
        @click="showCard"
        style="cursor: pointer"
      >
        <b-card
          :title="card.title"
          :img-src="
            card.attachments.length > 0
              ? 'http://localhost:8081/getImage/' +
                card.attachments[0].path
                  .replaceAll('\\', '@')
                  .replaceAll('/', '@') +
                '@' +
                card.attachments[0].systemFilename
                  .replaceAll('\\', '@')
                  .replaceAll('/', '@')
              : 'https://picsum.photos/600/300/?image=25'
          "
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            {{ card.content }}
          </b-card-text>

          <div style="float: right">
            <b-button
              v-if="
                isCardCreator(card.state) ||
                isBoardCreator(card.state) ||
                isTeamCreator(card.state)
              "
              @click="stopPropagation"
              :to="{
                path: '/main/' + teamId + '/' + boardId,
                query: { cardId: card.id },
              }"
              variant="outline-primary"
              class="card-modify-btn"
              >Modify</b-button
            >
            &nbsp;
            <b-button
              v-if="
                isCardCreator(card.state) ||
                isBoardCreator(card.state) ||
                isTeamCreator(card.state)
              "
              class="card-delete-btn"
              @click="stopPropagation, deleteCard(card.id)"
              variant="outline-danger"
              >Delete</b-button
            >
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteCard } from '@/api/card';

export default {
  name: 'Card',
  data() {
    return {
      teamId: this.$route.params.teamId,
      boardId: this.$route.params.boardId,
    };
  },
  methods: {
    // 이벤트 버블링 방지
    stopPropagation(event) {
      event.stopPropagation();
    },
    showCard() {
      console.log('모달을 보여주세요');
    },
    async deleteCard(cardId) {
      let modal = {
        title: '삭제',
        message: '카드를 삭제 하시 겠습니까?',
      };

      // 확인 모달 호출
      let confirm = await this.$confirmModal(modal.title, modal.message);
      if (confirm) {
        console.log(cardId);
        try {
          let { data } = await deleteCard(cardId);
          console.log(data);
          this.$defualtToast('성공');
        } catch (e) {
          console.log(e);
          this.$defualtToast('에러', { type: 'error' });
        }

        await this.$store.dispatch(
          'refreshOnlyCards',
          this.$route.params.boardId,
        );
      }
    },
    isCardCreator(auth) {
      return auth == 'CARD_CREATOR';
    },
    isBoardCreator(auth) {
      return auth == 'BOARD_CREATOR';
    },
    isTeamCreator(auth) {
      return auth == 'CREATOR';
    },
  },
  computed: {
    // 기본적으로 store에서 불러온 card를 가지고 컴포넌트를 랜더링 하나, cards의 데이터를 변화시키는 시점은 이 컴포넌트가 활성화 되는 시점임(watch)
    cards() {
      return this.$store.state.page.cards;
    },
  },
  updated() {
    console.log(document.querySelectorAll('button.card-delete-btn'));

    let deleteBtn = document.querySelectorAll('button.card-delete-btn');
    let modifyBtn = document.querySelectorAll('a.card-modify-btn');

    if (deleteBtn.length > 0)
      for (let btn of deleteBtn)
        btn.addEventListener('click', this.stopPropagation);

    if (modifyBtn.length > 0)
      for (let btn of modifyBtn)
        btn.addEventListener('click', this.stopPropagation);
  },
};
</script>

<style>
.f-container {
  display: flex;
  flex-flow: row wrap;
}
.fit {
  width: fit-content;
  display: inline-block;
  margin-right: 2vw;
  margin-bottom: 2vh;
}
.card {
  min-width: 20rem;
}
</style>
