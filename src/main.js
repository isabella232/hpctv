/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-shim';
import Vue from 'vue';
import App from './App';
import router from './router';
import Autoplay from './Autoplay';
import { store } from './vuex/store';

Vue.config.productionTip = false;

// global Autoplay logic
Vue.mixin(Autoplay);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
