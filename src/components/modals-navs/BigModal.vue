<template>
  <div class="big-modal">
    <div class="overlay row dead-center" @click="handleExitTap()">
      <div class="body row" @click.stop>
        <header class="project-title upper">
          <div class="title">
            <div class="cell">
              <h1>{{data.longProjectName}}</h1>
              <h2>{{data.area}}</h2>
            </div>
          </div>
          <div class="project-specs start">
            <ul class="collection">
              <StatCard v-for="(stat,i) in data.statData" :key="stat.statName" :cardData="data.statData[i]" />
            </ul>
            <hr>
            <div class="project-lead">
              <div class="row top">
                <img v-if="data.projectLead.thumbnail" :src="data.projectLead.thumbnail" alt="photo of Lead Scientist">
                <div class="lead-info">
                  <span class="lime">{{ data.projectLead.name}}</span>
                  <span>{{ data.projectLead.organizationName }}</span>
                  <span v-if="data.projectLead.twitter">{{ data.projectLead.twitter }}</span>
                </div>
              </div>
              <p v-if="data.projectLead.shortBio">
                {{ data.projectLead.shortBio }}
              </p>
            </div>
          </div>
        </header>

        <section class="relative">
          <div class="media-container">
            <Carousel :perPage="1" @pageChange="visibleContentID = $event" :paginationEnabled="false">
              <AppSlide v-for="slide in data.mainContent" :key="slide.title">
                <img v-if="isImage(slide.media)" :src="slide.media" class="hero-image">
                <video v-else-if="isVideo(slide.media)" :src="slide.media" controls muted playsinline loop autoplay controlsList="nodownload"></video>
                <div v-else>{{slide.media}}</div>
              </AppSlide>
            </Carousel>
          </div>

          <article class="modal-article text-center" ref="article">
            <h3 class="upper">{{ data.mainContent[visibleContentID].title }}</h3>
            <div class="article-content row">
              <div class="main-content" v-html="data.mainContent[visibleContentID].body">
              </div>
            </div>
          </article>

          <div class="slide-navigation">
            <button class="prev" @click="handleExternalNav(visibleContentID - 1)" :disabled="visibleContentID === 0">
              <img src="../../assets/icon/nav-arrow.svg" alt="">
            </button>

            <button class="next" @click="handleExternalNav(visibleContentID + 1)" :disabled="visibleContentID === 1">
              <img class="reverse" src="../../assets/icon/nav-arrow.svg" alt="">
            </button>
          </div>
        </section>

        <button class="exit" @click="handleExitTap()"><img src="../../assets/icon/plus-x-icon.svg" alt="exit"></button>
      </div>
    </div>
  </div>
</template>

<script>
import StatCard from '../StatCard';
import Carousel from './Carousel';
import Slide from './MediaHelper';

export default {
  props: {
    data: {
      type: Object,
      required: true,
      validator(data) {
        if (typeof data === 'object') {
          // eslint-disable-next-line no-prototype-builtins
          return data.hasOwnProperty('name');
        } else {
          return false;
        }
      }
    }
  },
  components: {
    StatCard,
    Carousel,
    AppSlide: Slide
  },

  data() {
    return {
      visibleContentID: 0
    };
  },

  methods: {
    /**
     * Sends an event to the parent to clost the modal
     */
    handleExitTap() {
      document.querySelector('html').classList.remove('freeze');
      document.querySelector('body').classList.remove('freeze');
      this.$emit('modalBorderTapped', false);
    },

    /**
     * Hooks into Vue-Carousel's navigation
     * @param {Number} direction goes to position in carousel with index of "direction"
     */
    handleExternalNav(direction) {
      this.$children.find(component => component.$el.className == 'VueCarousel').goToPage(direction);
    },

    /**
     * returns if argument has common image file extension
     * @param {String} filepath the filename to parse
     */
    isImage(filepath) {
      if (filepath.includes('jpg') || filepath.includes('jpeg') || filepath.includes('png')) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * returns if argument has common video file extension
     * @param {String} filepath the filename to parse
     */
    isVideo(filepath) {
      if (filepath.includes('mp4') || filepath.includes('webm') || filepath.includes('mov')) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style src="../../assets/scss/big-modal.scss" lang="scss"></style>
