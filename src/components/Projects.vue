<template >
  <div class="projects">
    <header class="row dead-center text-center upper">
      <h1>Cheyenne's Featured Projects</h1>
    </header>

    <article class="row dead-center">
      <div class="case-container">
        <h2>
          {{ vuex.headerTileCopy }}
        </h2>
      </div>
      <div class="case-container" v-for="(project, i) in vuex.featuredProjects" :key="project.name">
        <figure @click="openModal(i)">
          <img :src="project.heroImage" alt="">
          <div class="figure-overlay col dead-center">
            <img class="plus-icon" src="/static/icon/plus-x-icon.svg">
            <figcaption class="upper">{{ project.name }}</figcaption>
          </div>
        </figure>
      </div>

    </article>
    <big-modal v-if="modalIsOpen" :data="modalData" @modalBorderTapped="modalIsOpen = false">
    </big-modal>
    <dock-nav></dock-nav>
  </div>
</template>

<script>
import BigModal from './modals-navs/BigModal';
import DockNav from './modals-navs/DockNav';

export default {
  name: 'projects',
  components: {
    BigModal,
    DockNav
  },

  data() {
    return {
      modalIsOpen: false,
      modalData: ''
    };
  },

  computed: {
    vuex() {
      return this.$store.state.projects;
    }
  },

  methods: {
    openModal(i) {
      this.modalIsOpen = true;
      this.modalData = this.vuex.featuredProjects[i];
    }
  },
  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('projects-page');
  }
};
</script>

<style src="../scss/projects.scss" lang="scss"></style>