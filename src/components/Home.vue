<template>
  <div class="col dead-center">
    <div class="video-container">
      <video autoplay muted loop playsinline id="bg-video">
        <source src="/static/video/homepage.mp4" type="video/mp4" />
      </video>
    </div>
    <transition name="splash-fade-out">
      <Splash v-if="showSplash"/>
    </transition>
    <transition name="home-fade-in">
      <main class=" home-screen col dead-center" v-if="!showSplash">
        <div class="intro-container">
          <nav>

            <ul class="row around middle text-center">
              <li>
                <router-link to="specs" class="col middle around">
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

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('home-page');
  },

  mounted() {
    // some browsers do not support autoplay for video. this will trigger the video to play if that's the case.
    const video = document.querySelector('#bg-video');
    video.oncanplaythrough = () => {
      video.play();
    };
  }
};
</script>

<style src="../scss/home.scss" lang="scss"></style>