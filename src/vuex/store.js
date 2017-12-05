import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    home: {
      showSplash: true,
      quote: {
        text: "It's a fighter plane. You have to know how to fly it.",
        source: 'Gary New, Head of Operations'
      }
    },
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
  }
});
