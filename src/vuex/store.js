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
      baseURL: hpctvhost,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      auth: {
        username: 'hpctv',
        password: 'super'
      }
    },
    autoplay: {
      enabled: false,
      clicks: 0,
      timers: []
    }
  },
  mutations: {
    startButtonClicked(state) {
      state.home.showSplash = false;
    },

    activeTab(state, tab) {
      state.liveData.activeTab = tab;
    },

    renderAllSprites(state, value) {
      state.liveData.renderAllSprites = value;
    },

    // Begin Autoplay Mutations
    changeClicks(state, payload) {
      if (payload === '++') {
        state.autoplay.clicks++;
      }

      // dev mode
      if (payload === -1) {
        state.autoplay.enabled = true;
        state.autoplay.clicks = 0;
      }
      if (payload === 0) {
        state.autoplay.clicks = 0;
      }
      if (state.autoplay.clicks >= 5) {
        state.autoplay.enabled = !state.autoplay.enabled;
        console.log(`autoplay.enabled is now ${state.autoplay.enabled}`);
        state.autoplay.clicks = 0;
        window.localStorage.setItem('autoPlay', false);
      }
    },

    pushTimer(state, timer) {
      state.autoplay.timers.push(timer);
    },

    clearTimers(state) {
      for (const timer of state.autoplay.timers) {
        clearTimeout(timer);
      }
      state.autoplay.timers = [];
    },

    overrideAutoplayStatus(state, payload){ 
      state.autoplay.enabled = payload;
      state.autoplay.clicks = 0;
    }
  },

  getters: {
    autoplayClicks: state => state.autoplay.clicks
  },

  modules: {
    home,
    specs,
    liveData,
    projects
  }
});
