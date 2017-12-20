import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import specs from './specs';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    liveData: {
      colorScheme: 'cool',
      activeTab: 'user allocation'
    }
  },
  mutations: {
    startButtonClicked(state) {
      state.home.showSplash = false;
    },

    colorScheme(state, color) {
      state.liveData.colorScheme = color;
    }
  },

  modules: {
    home,
    specs
  }
});
