// vue 를 로드한다.
import Vue from 'vue';
// 설치한 라우터를 로드한다.
import VueRouter from 'vue-router';

Vue.use(VueRouter); // 라우터를 플러그인으로 사용할 것을 명시

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login', // 경로 선언
      component: () => import('@/views/LoginPage.vue'), // 장치 선택
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/NotFountPage.vue'),
    },
  ],
}); // 새로운 라우터를 생성해서 export
