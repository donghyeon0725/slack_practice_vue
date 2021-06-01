<template>
  <header>
    <div v-if="!isLogin">
      <b-nav>
        <b-nav-item :to="{ path: '/login' }">로그인</b-nav-item>
        <b-nav-item :to="{ path: '/signup' }">회원가입</b-nav-item>
      </b-nav>
    </div>
    <div v-if="isLogin">
      <b-nav>
        <b-nav-item :to="{ path: '/login' }">로그아웃</b-nav-item>
      </b-nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style scoped></style>
