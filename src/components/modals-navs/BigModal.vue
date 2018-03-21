<template>
  <div class="big-modal">
    <div class="overlay row dead-center" @click="handleExitTap()">
      <div class="body row" @click.stop="doNothing()">
        <header class="col project-title upper">
          <div class="title">
            <div class="cell">
              <h1>{{data.longProjectName}}</h1>
              <h2>{{data.area}}</h2>
            </div>
          </div>
          <div class="project-specs col start">
            <ul class="collection">
              <div v-for="(stat,i) in data.statData" :key="stat.statName">
                <stat-card :cardData="data.statData[i]">
                </stat-card>
                <hr>
              </div>
            </ul>
            <div class="project-lead">
              <div class="row top">
                <img v-if="data.projectLead.thumbnail" :src="data.projectLead.thumbnail" alt="photo of Lead Scientist">
                <div class="col lead-info">
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

        <section class="col relative">
          <div class="media-container">
            <Carousel :perPage="1" :paginationActiveColor="'#bfd600'" :paginationColor="'#d3d3d3'" :paginationSize="16" :paginationPadding="4" @pageChange="visibleContentID = $event">
              <AppSlide v-for="slide in data.mainContent" :key="slide.title">
                <img v-if="isImage(slide.media)" :src="slide.media" class="hero-image">
                <video v-else-if="isVideo(slide.media)" :src="slide.media" controls muted playsinline loop></video>
                <div v-else>{{slide.media}}</div>
              </AppSlide>
            </Carousel>
          </div>

          <article class="modal-article text-center">
            <h3 class="upper">{{ data.mainContent[visibleContentID].title }}</h3>
            <div class="article-content row">
              <div class="main-content" v-html="data.mainContent[visibleContentID].body">
              </div>
            </div>
          </article>

          <div class="slide-navigation">
            <span @click="handleExternalNav('n')">
              <img src="/static/icon/nav-arrow.svg" alt="">
            </span>

            <span @click="handleExternalNav('p')">
              <img class="reverse" src="/static/icon/nav-arrow.svg" alt="">
            </span>
          </div>
        </section>

        <button class="exit" @click="handleExitTap()"><img src="/static/icon/plus-x-icon.svg" alt="exit"></button>
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
      document.querySelector('body').classList.remove('freeze');
      this.$emit('modalBorderTapped', false);
    },
    /**
     * This function exists solely to stop propogation of the click event that dismisses the modal from extending to the body of the modal content. unfortunately void() is not valid in the template
     */
    doNothing() {
      return;
    },

    /**
     * Hooks into Vue-Carousel's navigation methods to override the crappy default navigation UI.
     * @param {String} direction either 'n' or 'p' (next, prev) do determine which way to go.
     */
    handleExternalNav(direction) {},

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

<style src="../../scss/big-modal.scss" lang="scss"></style>
