<template>
  <div class="container">
    <Spinner v-if="loading"></Spinner>
    <div class="side">
      <SideList></SideList>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/common/Spinner';
import SideList from '@/components/main/SideList';

export default {
  name: 'MainPage',
  components: { Spinner, SideList },
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
