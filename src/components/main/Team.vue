<template>
  <div class="accordion" role="tablist">
    <b-card
      no-body
      class="mb-1"
      v-for="(team, team_idx) in teams"
      :key="team_idx"
      :active="isActiveTeam(team_idx)"
      @click="changeActive(team_idx)"
    >
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          v-b-toggle="'accordion' + team_idx"
          variant="info"
          style="width: 100%; height: 100%"
          >{{ team.name }}</b-button
        >
      </b-card-header>
      <b-collapse
        :id="'accordion' + team_idx"
        :visible="isActiveTeam(team_idx)"
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-card-text>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ team.name }}</h5>
              <small>{{ team.date | dayAgo }} days ago</small>
            </div>
          </b-card-text>
          <b-card-text class="pb-2" style="border-bottom: 1px solid gray">
            {{ team.description }}
          </b-card-text>

          <!-- 보드 생성 버튼 -->
          <b-card-text>
            <BoardForm :team="team"></BoardForm>
          </b-card-text>

          <!-- 보드 -->
          <b-card-text>
            <Board
              v-if="isActiveTeam(team_idx)"
              :team="team"
              :isActived="isActiveTeam(team_idx)"
            ></Board>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <!-- 팀 생성 버튼 + TeamForm 모달 -->
    <TeamForm></TeamForm>
  </div>
</template>

<script>
import { getTeams } from '@/api/team';
import { getBoards } from '@/api/board';
import Board from '@/components/main/side/Board';
import TeamForm from '@/components/main/side/TeamForm';
import BoardForm from '@/components/main/side/BoardForm';

export default {
  name: 'Team',
  components: {
    Board,
    TeamForm,
    BoardForm,
  },
  data() {
    return {};
  },
  methods: {
    async changeActive(idx) {
      let teams = this.$store.state.page.teams;

      await this.$store.dispatch('setSelectedTeamIdx', idx);
      await this.$store.dispatch('setSelectedTeam', teams[Number(idx)]);

      const { data } = await getBoards(teams[Number(idx)].id);
      await this.$store.dispatch('setBoards', data);
    },
    async getTeams() {
      try {
        const { data } = await getTeams();
        this.teams = data;

        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getBoards() {
      try {
        let selectedTeam = await this.$store.state.page.selectedTeam;
        const { data } = await getBoards(selectedTeam.id);
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    /* 페이지 정보 초기화 */
    async init(teams, boards) {
      try {
        let init = 0;

        // 팀, 정보 setting
        await this.$store.dispatch('setTeams', teams);
        await this.$store.dispatch('setSelectedTeamIdx', init);
        await this.$store.dispatch('setSelectedTeam', teams[init]);
        await this.$store.dispatch('setBoards', boards);
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    isActiveTeam() {
      return id => {
        return id == this.$store.state.page.selectedTeamIdx;
      };
    },
    teams: {
      get() {
        return this.$store.state.page.teams;
      },
      set(list) {
        this.$store.dispatch('setTeams', list);
      },
    },
    activeTeamIdx: {
      get() {
        return this.$store.state.page.selectedTeamIdx;
      },
      set(int) {
        this.$store.dispatch('setSelectedTeamIdx', int);
      },
    },
  },
  async created() {
    if (this.$store.state.page.init) {
      let teams = await this.getTeams();
      let boards = await this.getBoards();
      await this.init(teams, boards);
      await this.$store.dispatch('initComplete');
    }
  },
};
</script>

<style>
.close {
  border: none;
  background: none;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}
</style>
