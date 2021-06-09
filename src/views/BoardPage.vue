<template>
  <div class="card-container">
    <div class="cover">
      <b-img
        src="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMDZfMTM3/MDAxNTUxODE0NTI0NDkz.RvXlYv6p5xPwXrOIPfABgFuiknuTn0iFZNuUguVYc_og.ii04J6D96C6FKQSXQzy9DABBNk7vNuU343nmAquhmZgg.JPEG.mong728/%25EC%25B4%2588%25EA%25B3%25A0%25ED%2599%2594%25EC%25A7%2588_%25EC%25BB%25B4%25ED%2593%25A8%25ED%2584%25B0_%25EB%25B0%25B0%25EA%25B2%25BD%25ED%2599%2594%25EB%25A9%25B4_(7).jpg?type=w800"
        fluid
        alt="Fluid image"
      ></b-img>

      <b-button-group class="btn-group">
        <b-button
          variant="light"
          v-if="isBoardCreator"
          v-b-modal="'board_modify_form'"
          >보드 수정하기</b-button
        >
        <b-button
          variant="light"
          v-if="isTeamCreator || isBoardCreator"
          @click="deleteBoard"
          >보드 삭제하기</b-button
        >
      </b-button-group>
    </div>

    <div class="center-fluid">
      <div class="content">
        <div class="title h1 mb-4">{{ board.title }}</div>
        <div class="description h6">{{ board.content }}</div>
      </div>

      <!-- 보드 수정 폼 -->
      <BoardEditForm id="board_modify_form"></BoardEditForm>

      <div class="cards">
        <Card></Card>
      </div>
    </div>
    <!-- 카드 생성 폼 -->
    <div class="card-creator">
      <b-button
        variant="outline-secondary"
        title="Align center"
        class="card-create-btn"
        v-b-modal="'card-create-modal'"
      >
        <b-icon icon="plus"></b-icon>
      </b-button>

      <CardForm id="card-create-modal"></CardForm>
    </div>

    <!-- 카드 상세보기 폼 -->
    <CardEditForm :modal-show="true"></CardEditForm>
  </div>
</template>

<script>
import BoardEditForm from '@/components/main/side/BoardEditForm';
import { deleteBoard } from '@/api/board';
import { getCards } from '@/api/card';
import Card from '@/components/main/center/Card';
import CardForm from '@/components/main/center/CardForm';
import CardEditForm from '@/components/main/center/CardEditForm';

export default {
  name: 'BoardPage',
  components: {
    BoardEditForm,
    Card,
    CardForm,
    CardEditForm,
  },
  data() {
    return {
      boardId: this.$route.params.boardId || 0,
    };
  },
  methods: {
    async deleteBoard() {
      let modal = {
        title: '삭제',
        message: '보드를 삭제 하시 겠습니까?',
      };

      // 확인 모달 호출
      let confirm = await this.$confirmModal(modal.title, modal.message);
      if (confirm) {
        try {
          let boardId = this.$route.params.boardId;
          let { data } = await deleteBoard(boardId);
          console.log(data);
          this.$defualtToast('삭제 성공');
        } catch (e) {
          console.log(e);
          this.$defualtToast('삭제 실패');
        }

        await this.$store.dispatch('refreshTeamsAndEmptyOther');

        await this.$router.push('/main/' + this.$route.params.teamId);
      }
    },
  },
  computed: {
    board() {
      // Board 의 beforeCreate 훅 보다, 하위 컴포넌트인 이 컴포넌트의 created가 더 빠르기 때문에 값이 없을 수도 있습니다.
      return (
        this.$store.state.page.boards.filter(s => s.id == this.boardId)[0] || {}
      );
    },
    isTeamCreator() {
      return this.board.state == 'CREATOR';
    },
    isBoardCreator() {
      return this.board.state == 'BOARD_CREATOR';
    },
  },
  // cards를 리로드 합니다.
  async created() {
    try {
      let boardId = this.$route.params.boardId;
      let { data } = await getCards(boardId);

      await this.$store.dispatch(
        'setCards',
        data.sort((a, b) => a.position - b.position),
      );
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card-container .center-fluid {
  padding-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.cover {
  width: 100%;
  position: relative;
}

.cover img {
  display: block;
  object-fit: cover;
  border-radius: 0px;
  width: 100%;
  object-position: center 40%;
  height: 20vh;
}

.btn-group {
  position: absolute;
  bottom: 10%;
  right: 5%;
}

.card-container .content {
  position: relative;
  height: 15vh;
}

.card-creator {
  position: fixed;
  right: 10vw;
  bottom: 10vh;
}

.card-create-btn {
  border-radius: 100%;
  width: 60px;
  height: 60px;
  border: 1px solid gray;
  padding: 7px;
}
.title {
  font-weight: 900;
}
.description {
  font-weight: 500;
}
</style>
