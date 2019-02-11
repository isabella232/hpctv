/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-shim';
import Vue from 'vue';
import App from './App';
import router from './router';
import Autoplay from './Autoplay';
import { store } from './vuex/store';
import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false;

// global Autoplay logic
Vue.mixin(Autoplay);

Vue.use(VueAnalytics, {
  id: 'UA-134131143-1',
  router,
  debug: {
    enabled: false,
    sendHitTask: true
  },
  autoTracking: {
    screenview: true
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
