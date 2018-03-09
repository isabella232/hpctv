import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import specs from './specs';
import liveData from './live-data';
import projects from './projects';
Vue.use(Vuex);

let host;

switch (window.location.host) {
  case 'localhost:8080':
  case /\.vera$/:
    console.log('this is local environment');
    host = 'https://private-08983-hpctv.apiary-mock.com/v1/';
    break;

  case /\.vermilion\.com$/:
    console.log('this is a staging environment');
    host = 'https://private-08983-hpctv.apiary-mock.com/v1/';

    break;
  case /ucar\.edu$/:
    console.log('this is a production environment');
    host = 'https://hpctv-test.ucar.edu/v1/';
    break;

  default:
    console.error("could not determine the environment in store.js");
    break;
}



export const store = new Vuex.Store({
  state: { 
    apiConfig: {
      baseURL: host,
      auth: {
        username: 'hpctv',
        password: 'super'
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
