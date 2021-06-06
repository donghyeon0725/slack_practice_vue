<template>
  <div>MainCenterPage</div>
</template>

<script>
export default {
  name: 'BoardPage',
  data() {
    return {
      id: this.$route.params.boardId,
    };
  },
};
</script>

<style scoped></style>
