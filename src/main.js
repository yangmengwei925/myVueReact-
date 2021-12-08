// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// mint-ui样式库
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

import VueTouch from 'vue-touch';

import axios from 'axios';

import vueScroll from 'vue-scroll';

Vue.http = axios;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(MintUI);
Vue.use(vueScroll);
Vue.use(VueTouch, {
  name: 'v-touch'
})

// 刚刚引入的时候如果报错的话重启一下就好了
// Vue.use(VueTouch, {
//   name: 'v-touch'
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
