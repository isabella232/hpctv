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
            <Carousel :perPage="1" :paginationActiveColor="'#bfd600'" :paginationSize="16" :paginationPadding="8">
              <Slide><img src="/static/img/modal-placeholder.jpg" class="hero-image" alt=""></Slide>
              <Slide><img src="/static/img/modal-placeholder.jpg" class="hero-image" alt=""></Slide>
              <Slide> other slide content goes here.</Slide>
            </Carousel>
          </div>

          <article class="modal-article societal-impact text-center">
            <h3 class="upper">Societal Impact</h3>
            <div class="article-content row">
              <p class="main-content">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae! </p>
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
import { Carousel, Slide } from 'vue-carousel';
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
    Slide
  },

  data() {
    return {
      activeTab: 'summary'
    };
  },

  methods: {
    handleExitTap() {
      this.$emit('modalBorderTapped', false);
    },
    doNothing() {
      // This function exists solely to stop propogation of the click event that dismisses the modal from extending to the body of the modal content
    }
  }
};
</script>

<style src="../../scss/big-modal.scss" lang="scss"></style>
