<template>
  <div class="container">
    <Spinner v-if="loading"></Spinner>
    <div class="side">
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
