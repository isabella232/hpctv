<template>
  <div class="big-modal">
    <div class="overlay row dead-center" @click="handleExitTap()">
      <div class="body row" @click.stop="doNothing()">
        <header class="col project-title upper">
          <div class="title">
            <h1>{{data.name}}</h1>
            <h2>Area of science</h2>
          </div>
          <div class="project-specs col between">
            <stat-card v-for="(stat,i) in data.statData" 
              :key="stat.statName" 
              :cardData="data.statData[i]">
            </stat-card>

            <div class="project-lead">
              <img src="https://placehold.it/100x100" alt="">
              <span class="lime">Lead Name</span>
              <span>Lead Job title</span>
              <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatibus eligendi quas voluptatem sint </p>
            </div>
          </div>
        </header>

        <section class="col">
          <img src="/static/img/modal-placeholder.jpg"  class="hero-image" alt="">
          <article class="modal-article">
            <h3 class="upper">Article Title</h3>
            <div class="article-content row">

            <p class="abstract">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatibus eligendi quas voluptatem sint officiis cum veritatis, neque iste quasi.
            </p>
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
import StatCard from './StatCard';

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
    StatCard
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