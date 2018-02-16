import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import specs from './specs';
import liveData from './live-data';
import projects from './projects';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    apiConfig: {
      baseURL: 'https://private-08983-hpctv.apiary-mock.com/v1/',
      auth: {
        username: '',
        password: ''
      }
    }
  },
  mutations: {
    startButtonClicked(state) {
      state.home.showSplash = false;
    },

    activeTab(state, tab) {
      state.liveData.activeTab = tab;
    }
  },

  modules: {
    home,
    specs,
    liveData,
    projects
  }
});
