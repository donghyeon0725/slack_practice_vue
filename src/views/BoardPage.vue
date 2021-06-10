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
        <div class="t-left">
          <div class="title h1 mb-4">
            {{ board.title }}
          </div>
          <div class="description h6">{{ board.content }}</div>
        </div>

        <div class="t-right">
          <div class="top">
            <b-button
              variant="light"
              v-if="isTeamCreator || isBoardCreator"
              v-b-modal="'invite_modal'"
              >초대</b-button
            >
            <b-modal
              id="invite_modal"
              title="User Invite"
              button-size="sm"
              @ok="inviteUser"
              ok-only
            >
              <b-form-input
                id="invite_email"
                v-model="inviteForm.email"
                type="email"
                placeholder="Enter Email What You Want To Invite"
                autocomplete="off"
                required
              ></b-form-input>
              <AutoComplete
                v-on:update="choice"
                :list="searchEmailList"
                :search="'email'"
                :option="option"
                id="invite_email_complete"
              ></AutoComplete>
            </b-modal>
          </div>
          <div class="bottom">
            <div
              class="icon-cover"
              :key="index"
              :title="member.user.email"
              v-b-tooltip.hover
              v-for="(member, index) in teamMembers"
            >
              <b-icon icon="person-fill" class="icon fade-in"></b-icon>
            </div>
          </div>
        </div>
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

    <!-- 카드 수정하기 폼 -->
    <CardEditForm></CardEditForm>

    <!-- 카드 상세보기 폼 -->
    <CardDetailForm></CardDetailForm>
  </div>
</template>

<script>
import BoardEditForm from '@/components/main/side/BoardEditForm';
import { getUserEmail } from '@/api/auth';
import { inviteTeam } from '@/api/team';
import { getCards } from '@/api/card';
import { deleteBoard } from '@/api/board';
import { isLetter } from '@/util/validation';
import Card from '@/components/main/center/Card';
import CardForm from '@/components/main/center/CardForm';
import CardEditForm from '@/components/main/center/CardEditForm';
import CardDetailForm from '@/components/main/center/CardDetailForm';
import AutoComplete from '@/components/common/AutoComplete';

export default {
  name: 'BoardPage',
  components: {
    BoardEditForm,
    Card,
    CardForm,
    CardEditForm,
    CardDetailForm,
    AutoComplete,
  },
  data() {
    return {
      boardId: this.$route.params.boardId || 0,
      inviteForm: {
        email: '',
        init: false,
        list: [],
      },
    };
  },
  methods: {
    async getUserList(event) {
      if (this.inviteForm.email.length == 4) {
        if (!isLetter(event.key)) return;
        // 4개 길이의 값을 입력하는 순간, 데이터를 불러옵니다. 상위 다섯개의 이메일만 불러옵니다.
        // 이 후, 정규식에 맞는 데이터만 사용자에게 보여줍니다.
        try {
          let { data } = await getUserEmail(this.inviteForm.email);
          this.inviteForm.list = data;
        } catch (e) {
          console.log(e);
        }
      }
    },
    async inviteUser() {
      let teamId = this.$route.params.teamId;

      try {
        let { data } = await inviteTeam(teamId, this.inviteForm.email);
        console.log(data);
        this.$defualtToast('초대 메일을 보냈습니다');
      } catch (e) {
        console.log(e);
        this.$defualtToast('에러', { type: 'error' });
      }
    },
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
          this.$defualtToast('삭제 실패', { type: 'error' });
        }

        await this.$store.dispatch('refreshTeamsAndEmptyOther');

        await this.$router.push('/main/' + this.$route.params.teamId);
      }
    },
    choice(item) {
      this.inviteForm.email = item.email;
    },
    resetInviteForm() {
      this.inviteForm.email = '';
      this.inviteForm.list = [];
      this.inviteForm.init = false;
    },
  },
  computed: {
    option() {
      return {
        width: 466,
        top: 60,
        left: 17,
      };
    },
    searchEmailList() {
      return this.inviteForm.list.filter(s =>
        new RegExp(this.inviteForm.email, 'gi').test(s.email),
      );
    },
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
    teamMembers() {
      return this.$store.state.page.members || [];
    },
  },
  // cards를 리로드 합니다.
  async created() {
    try {
      let teamId = this.$route.params.teamId;
      await this.$store.dispatch('refreshOnlyMembers', teamId);
    } catch (e) {
      console.log(e);
    }

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
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId == 'invite_modal') this.resetInviteForm();
    });
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      if (modalId == 'invite_modal') {
        if (!this.inviteForm.init) {
          // textarea 의 enter를 전송 처리로 바꾸고, crtl + enter을 new line 처리로 바꿉니다.
          let input = document.getElementById('invite_email');

          if (this.$isNotEmpty(input))
            input.addEventListener('keyup', this.getUserList);

          this.inviteForm.init = !this.inviteForm.init;
        }
      }
    });
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

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}
.t-left {
  flex-basis: 40vw;
}
.t-right {
  flex-basis: 15vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.t-right .top {
  flex-basis: 40px;
}

.t-right .top > button {
  float: right;
}

.t-right .bottom {
  flex-basis: 100%;
  height: 10vh;
  display: flex;
}
.t-right .icon {
  background-color: #e4e5e6;
  display: inline-block;
  margin: 3px;
  width: 40px;
  height: 40px;
  border: 1px solid #e4e5e6;
  border-radius: 100%;
  position: relative;
  top: 3px;
  font-size: 20px;
}

.fade-in {
  animation: fadein 1s;
  -moz-animation: fadein 1s;
  /* Firefox */
  -webkit-animation: fadein 1s;
  /* Safari and Chrome */
  -o-animation: fadein 1s;
  /* Opera */
}

@keyframes fadein {
  from {
    width: 50px;
    height: 50px;
    opacity: 0;
  }

  to {
    width: 40px;
    height: 40px;
    opacity: 1;
  }
}

@-moz-keyframes fadein {
  /* Firefox */
  from {
    width: 50px;
    height: 50px;
    opacity: 0;
  }

  to {
    width: 40px;
    height: 40px;
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    width: 50px;
    height: 50px;
    opacity: 0;
  }

  to {
    width: 40px;
    height: 40px;
    opacity: 1;
  }
}

@-o-keyframes fadein {
  /* Opera */
  from {
    width: 50px;
    height: 50px;
    opacity: 0;
  }

  to {
    width: 40px;
    height: 40px;
    opacity: 1;
  }
}
</style>
