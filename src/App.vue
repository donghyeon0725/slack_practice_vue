<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/common/Header';

export default {
  name: 'main',
  components: {
    Header,
  },
};
</script>

<style scoped></style>
