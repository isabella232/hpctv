import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import liveData from './modules/live-data'
import projects from './modules/projects'
import specs from './modules/specs'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    liveData,
    specs,
    projects
  }
})
