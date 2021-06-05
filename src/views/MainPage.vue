<template>
  <div class="container p-0 m-0" style="height: 100vh">
    <Spinner v-if="loading"></Spinner>
    <div class="side me-2" style="background: #f7f6f3">
      <TeamList></TeamList>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/common/Spinner';
import TeamList from '@/components/main/Team';

export default {
  name: 'MainPage',
  components: { Spinner, TeamList },
  data() {
    return {
      loading: false, // true로 변경해서 확인해보세요.
    };
  },
};
</script>

<style>
.container {
  margin: 20px 0 0 0;
  padding: 0;
  display: flex;
}

.side {
  flex-basis: 400px;
}
</style>
