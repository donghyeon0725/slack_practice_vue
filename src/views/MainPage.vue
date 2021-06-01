<template>
  <div
    style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <Spinner v-if="loading"></Spinner>
    메인 페이지
  </div>
</template>

<script>
import Spinner from '@/components/common/Spinner';

export default {
  name: 'MainPage',
  components: { Spinner },
  data() {
    return {
      loading: false, // true로 변경해서 확인해보세요.
    };
  },
};
</script>

<style>
#app {
  margin: 20px;
}
</style>
