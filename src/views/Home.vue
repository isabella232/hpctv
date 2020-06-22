<template>
  <div class="home-wrapper">
    <div class="video-container">
      <video autoplay muted loop playsinline id="bg-video">
        <source src="../assets/video/homepage.mp4" type="video/mp4" />
      </video>
    </div>
    <transition name="fade" mode="out-in">
      <Splash v-if="showSplash" ref="splash" />
      <main class="home-screen" v-else>
        <div class="intro-container">
          <nav>
            <ul class="around middle text-center">
              <li>
                <router-link to="specs" class="middle around" ref="toSpecs">
                  <img src="../assets/icon/performance-icon.svg" width="100" alt="">
                  <span class="lime upper">Specs</span>
                </router-link>
              </li>

              <li>
                <router-link to="live-data" class="middle around">
                  <img src="../assets/icon/live-data-icon-2.svg" width="100" alt="">
                  <span class="lime upper">Live Data</span>
                </router-link>
              </li>

              <li>
                <router-link to="projects" class="middle around">
                  <img src="../assets/icon/projects-icon.svg" width="100" alt="">
                  <span class="lime upper">Projects</span>
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="text-container text-center">
            <h1 class="upper">
              <span class="lime" v-html="vuex.introPanel.mainHeader"></span>
            </h1>
            <p>
              {{vuex.introPanel.body}}
            </p>
          </div>
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
import Splash from '../components/Splash';

export default {
  name: 'app',
  components: { Splash },

  computed: {
    showSplash() {
      return this.$store.state.home.showSplash;
    },

    vuex() {
      return this.$store.state.home;
    }
  },

  methods: {
    beginAutoplay(){
      const v = this;
      this.automate([
        {delay: 5000, trigger(){ v.$refs.splash.handleStartClick();}},
        {delay: 30000, trigger(){ v.$refs.toSpecs.$el.click() }}
      ]);
    }
  },

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList.remove('home-page', 'projects-page', 'specs-page', 'live-data-page');
    document.body.classList.add('home-page');
  },

  mounted() {
    // some browsers do not support autoplay for video. this will trigger the video to play if that's the case.
    if (window.localStorage.getItem('autoPlay') === 'true') {
      console.log('autoplay cookie found');
      this.$store.commit('changeClicks', -1);
    }
  }
};
</script>

<style src="../assets/scss/home.scss" lang="scss"></style>