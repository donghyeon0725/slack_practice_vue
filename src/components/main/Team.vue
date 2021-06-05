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
        style="background: #f7f6f3"
      >
        <b-card-body>
          <b-card-text>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">
                {{ team.name }}
                <!-- 팀 수정 버튼 -->
                <TeamEditForm v-if="team.state == 'CREATOR'"></TeamEditForm>
                <!-- 팀 삭제 버튼 -->
                <b-link block @click="deleteTeam" v-if="team.state == 'CREATOR'"
                  ><b-icon icon="x"></b-icon
                ></b-link>
              </h5>
              <small>{{ team.date | dayAgo }} days ago</small>
            </div>
          </b-card-text>
          <b-card-text class="pb-2" style="border-bottom: 1px solid gray">
            {{ team.description }}
          </b-card-text>

          <!-- 보드 생성 버튼 && 보드 폼 -->
          <b-card-text>
            <b-button
              v-b-modal="'board_modal-' + team_idx"
              block
              variant="outline-dark"
              style="width: 100%"
              >보드 생성하기</b-button
            >
            <BoardForm :id="'board_modal-' + team_idx"></BoardForm>
          </b-card-text>

          <!-- 보드 -->
          <b-card-text>
            <Board
              v-if="isActiveTeam(team_idx)"
              :isActived="isActiveTeam(team_idx)"
            ></Board>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <!-- 팀 생성 버튼 + TeamForm 모달 -->
    <TeamForm></TeamForm>

    <!-- 결과창 -->
    <b-modal id="TeamResult" cancel-only
      >{{ resContent }}
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()"> 닫기 </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { deleteTeam } from '@/api/team';
import Board from '@/components/main/side/Board';
import TeamForm from '@/components/main/side/TeamForm';
import BoardForm from '@/components/main/side/BoardForm';
import TeamEditForm from '@/components/main/side/TeamEditForm';

export default {
  name: 'Team',
  data() {
    return {
      resContent: '',
    };
  },
  components: {
    Board,
    TeamForm,
    BoardForm,
    TeamEditForm,
  },
  methods: {
    async changeActive(idx) {
      await this.$store.dispatch('setSelectedTeamIdx', idx);
      await this.$store.dispatch('setSelectedBoardIdx', -1);
      await this.$store.dispatch('refreshSetting');
    },
    async deleteTeam() {
      try {
        let selectedTeam = await this.$store.state.page.selectedTeam;
        let result = await deleteTeam(selectedTeam.id);
        this.resContent = '삭제 성공했습니다';
        console.log(result);
      } catch (e) {
        this.resContent = '에러가 발생했습니다.';
        console.log(e);
      }

      await this.$root.$emit('bv::show::modal', 'TeamResult');

      await this.$store.dispatch('refreshSetting');
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
      await this.$store.dispatch('init');
    }

    await this.$store.dispatch('refreshSetting');
    await this.$store.dispatch('initComplete');
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
