<template>
  <b-nav pills v-if="boards.length > 0">
    <b-nav-item-dropdown
      :id="'dropdown' + team.id"
      text="보드를 선택하세요."
      toggle-class="nav-link-custom"
      right
      style="width: inherit"
    >
      <b-dropdown-item
        style="width: 100%"
        :key="'dropdown' + board_idx"
        v-for="(board, board_idx) in boards"
        >{{ board.title }}</b-dropdown-item
      >
      <!--<b-dropdown-divider></b-dropdown-divider>-->
    </b-nav-item-dropdown>
  </b-nav>
</template>

<script>
export default {
  name: 'Board',
  props: {
    isActived: {
      type: Boolean,
      required: true,
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
  },
};
</script>

<style scoped></style>
