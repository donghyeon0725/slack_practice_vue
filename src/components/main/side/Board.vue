<template>
  <b-nav v-if="boards.length > 0">
    <b-nav-item-dropdown
      :id="'dropdown' + team.id"
      :text="selectedBoard.title"
      toggle-class="nav-link-custom"
      right
      style="width: inherit"
    >
      <b-dropdown-item
        style="width: 100%"
        :key="'dropdown' + board_idx"
        v-for="(board, board_idx) in boards"
        @click="changeActivatedBoard(board_idx)"
      >
        <b-nav-item :to="{ path: '/main/' + board_idx }">{{
          board.title
        }}</b-nav-item></b-dropdown-item
      >
      <!--<b-dropdown-divider></b-dropdown-divider>-->
    </b-nav-item-dropdown>
  </b-nav>
</template>

<script>
// import { getBoards } from '@/api/board';

export default {
  name: 'Board',
  props: {
    isActived: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async changeActivatedBoard(board_idx) {
      await this.$store.dispatch('setSelectedBoardIdx', Number(board_idx));
      await this.$store.dispatch('refreshTeamAndBoard');

      /*try {
        const { data } = await getCard(boards[selectedIdx].id);
        await this.$store.dispatch('setCard', data);
      } catch (e) {
        console.log(e);
      }*/
    },
  },
  computed: {
    team: {
      get() {
        /* state.selectedTeam에 변화가 일어나면 active 된 보드의 team을 사용하는 관련 컴포넌트가 자동 랜더링 됨 */
        if (this.isActived) return this.$store.state.page.selectedTeam;

        return {};
      },
      set(obj) {
        this.$store.commit('setSelectedTeam', obj);
      },
    },
    boards: {
      get() {
        /* state.selectedTeam에 변화가 일어나면 active 된 보드의, 에 변화가 일어나면 재계산 될값 */
        if (this.isActived) return this.$store.state.page.boards;

        return {};
      },
      set(list) {
        this.$store.commit('setBoards', list);
      },
    },
    selectedBoard: {
      get() {
        if (this.isActived) {
          let selectedBoard = this.$store.state.page.selectedBoard;
          if (Object.keys(selectedBoard).length != 0) return selectedBoard;
        }

        return { title: '보드를 선택하세요.' };
      },
      set(obj) {
        this.$store.commit('setSelectedBoard', obj);
      },
    },
  },
};
</script>

<style scoped></style>
