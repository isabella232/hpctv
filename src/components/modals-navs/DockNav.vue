<template>
  <nav :class="{'dock-nav': true, open: navIsOpen}">
    <button class="mobile-menu" @click="navIsOpen = !navIsOpen">&#9776;</button>
    <ul class="row">
      <li>
        <router-link to="/" exact>
          <img src="/static/icon/about-icon.svg" alt="">
          <span class="lime upper">About</span>
        </router-link>
      </li>
      <li>
        <router-link to="specs">
          <img src="/static/icon/performance-icon.svg" alt="">
          <span class="lime upper">Specs</span>
        </router-link>
      </li>
      <li>
        <router-link to="live-data" >
          <img src="/static/icon/real-time-data-icon.svg" alt="">
          <span class="lime upper">Live Data</span>
        </router-link>
      </li>
      <li>
        <router-link to="projects">
          <img src="/static/icon/projects-icon.svg" alt="">
          <span class="lime upper">Projects</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navIsOpen: false
    };
  },

  computed: {
    routes() {
      return this.$router.paths;
    }
  }
};
</script>

<style src="../../scss/dock-nav.scss" lang="scss" scoped>

</style>
