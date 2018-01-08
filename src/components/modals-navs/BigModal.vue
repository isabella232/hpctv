<template>
  <div class="big-modal">
    <div class="overlay row dead-center" @click="handleExitTap()">
      <div class="body row" @click.stop="doNothing()">
        <header class="col project-title upper">
          <div class="title">
            <h1>{{data.name}}</h1>
            <h2>Area of science</h2>
          </div>
          <div class="project-specs col start">
            <ul class="collection">
              <div v-for="(stat,i) in data.statData" :key="stat.statName">
                <stat-card :cardData="data.statData[i]">
                </stat-card>
                <hr style="display: block;width: 90%; margin: 5px auto;">
              </div>
            </ul>
            <div class="project-lead">
              <div class="row bottom">
                <img src="https://placehold.it/100x100" alt="">
                <div class="col lead-info">
                  <span class="lime">Lead Name</span>
                  <span>Lead Job title</span>
                </div>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatibus eligendi quas voluptatem sint
              </p>
            </div>
          </div>
        </header>

        <section class="col">
          <div class="media-container">
            <Carousel :perPage="1" :paginationActiveColor="'#bfd600'" :paginationSize="16" :paginationPadding="8" @pageChange="updateSlide($event)">
              <AppSlide v-for="slide in data.mainContent" :key="slide.title">
                <img v-if="isImage(slide.media)" :src="slide.media" class="hero-image">
                <video v-else-if="isVideo(slide.media)" :src="slide.media" controls ></video>
                <div v-else>{{slide.media}}</div>
              </AppSlide>
            </Carousel>
          </div>

          <article class="modal-article societal-impact text-center">
            <h3 class="upper">{{ data.mainContent[visibleContentID].title }}</h3>
            <div class="article-content row">
              <p class="main-content">
                {{ data.mainContent[visibleContentID].body }}
              </p>
            </div>
          </article>
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
// import MediaHelper from './MediaHelper';

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
    }
  },

  methods: {
    /**
      * Sends an event to the parent to clost the modal
      */
    handleExitTap() {
      this.$emit('modalBorderTapped', false);
    },
    /**
      * This function exists solely to stop propogation of the click event that dismisses the modal from extending to the body of the modal content
      */
    doNothing() {
      return;
    },
    /**
      * Updates this view when the carousel slide changes.
      * @param {Number} event the ID sent by the Carousel.
      */
      // TODO: Refactor into single line function in the template.
    updateSlide(event) {
      console.log('carousel page did change', event);
      this.visibleContentID = event;
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

<style src="../../scss/big-modal.scss" lang="scss"></style>
