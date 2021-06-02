import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index'; // 라우터 생성. 이때 굳이 .js는 사용하지 않아도 된다.
import store from '@/store/index'; // vuex import
import '@/filter/index'; // filter

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router, // 라우터 장착
  store,
}).$mount('#app');
