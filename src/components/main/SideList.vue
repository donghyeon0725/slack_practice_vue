<template>
  <b-list-group>
    <b-list-group-item
      href="#"
      class="flex-column align-items-start"
      v-for="(team, index) in teams"
      :key="index"
      :active="isActive(index)"
      @click="changeActive(index)"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ team.name }}</h5>
        <small>{{ team.date | dayAgo }} days ago</small>
      </div>

      <p class="mb-1">
        {{ team.description }}
      </p>

      <small>팀을 선택하세요.</small>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { teamList } from '@/api/team';

export default {
  name: 'SideList.vue',
  data() {
    return {
      teams: [],
      active_team: 0,
    };
  },
  methods: {
    changeActive(id) {
      this.active_team = id;
      // 페이지 정보 저장
      this.$store.dispatch('addPageInfo', { active_team: this.active_team });
    },
  },
  computed: {
    isActive() {
      let d = this;

      return id => {
        return id == d.active_team;
      };
    },
  },
  components: {},
  async created() {
    try {
      const { data } = await teamList();
      this.teams = data;

      // 페이지 인덱스가 없으면 0번으로 저장
      let page = this.$store.getters.getPageInfo;

      if (!{}.hasOwnProperty.call(page, 'active_team'))
        await this.$store.dispatch('addPageInfo', { active_team: 0 });
      else this.active_team = this.$store.getters.getPageInfo.active_team;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped></style>
