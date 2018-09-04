<template>
  <div class="home-wrapper col dead-center">
    <div class="video-container">
      <video autoplay muted loop playsinline id="bg-video">
        <source src="/static/video/homepage.mp4" type="video/mp4" />
      </video>
    </div>
    <transition name="fade" mode="out-in">
      <Splash v-if="showSplash" ref="splash" />
      <main class=" home-screen col dead-center" v-else>
        <div class="intro-container">
          <nav>

            <ul class="row around middle text-center">
              <li>
                <router-link to="specs" class="col middle around" ref="toSpecs">
                  <img src="/static/icon/performance-icon.svg" width="100" alt="">
                  <span class="lime upper">Specs</span>
                </router-link>
              </li>

              <li>
                <router-link to="live-data" class="col middle around">
                  <img src="/static/icon/live-data-icon-2.svg" width="100" alt="">
                  <span class="lime upper">Live Data</span>
                </router-link>
              </li>

              <li>
                <router-link to="projects" class="col middle around">
                  <img src="/static/icon/projects-icon.svg" width="100" alt="">
                  <span class="lime upper">Projects</span>
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="text-container text-center">
            <h1 class="col upper">
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
import Splash from './Splash';
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
      console.log('home begin autoplay');
      const v = this;
      this.automate([
        {delay: 5000, trigger(){ v.$refs.splash.handleStartClick();}},
        {delay: 30000, trigger(){ v.$refs.toSpecs.$el.click() }}
      ]);
    }
  },

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList.remove('home-page', 'project-page', 'specs-page', 'live-data-page');
    document.body.classList.add('home-page');
  },

  mounted() {
    // some browsers do not support autoplay for video. this will trigger the video to play if that's the case.
    const video = document.querySelector('#bg-video');
    // video.oncanplaythrough = () => {
    //   video.play();
    // };

    if (window.localStorage.getItem('autoPlay') == 'true') {
      console.log('autoplay cookie found');
      this.$store.commit('changeClicks', -1);
    }
  }
};
</script>

<style src="../scss/home.scss" lang="scss"></style>