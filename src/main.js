import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index'; // 라우터 생성. 이때 굳이 .js는 사용하지 않아도 된다.
import store from '@/store/index'; // vuex import
import '@/filter/index'; // filter
import globalPlugin from '@/global/index'; // global

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
// bootstrap 토스트 버그로 다른 라이브러리 사용
Vue.use(VueToast);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// global 함수
Vue.use(globalPlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router, // 라우터 장착
  store,
}).$mount('#app');
