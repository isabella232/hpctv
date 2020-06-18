<template>
  <nav :class="{'dock-nav': true, open: navIsOpen}">
    <button class="mobile-menu" @click="toggleNav()">&#9776;</button>
    <ul>
      <li>
        <a @click="handleAboutClick()">
          <img src="../../assets/icon/about-icon.svg" alt="">
          <span class="lime upper">About</span>
        </a>
      </li>
      <li>
        <router-link to="specs">
          <img src="../../assets/icon/performance-icon.svg" alt="">
          <span class="lime upper">Specs</span>
        </router-link>
      </li>
      <li>
        <router-link to="live-data" >
          <img src="../../assets/icon/live-data-icon-2.svg" alt="">
          <span class="lime upper">Live Data</span>
        </router-link>
      </li>
      <li>
        <router-link to="projects">
          <img src="../../assets/icon/projects-icon.svg" alt="">
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
,
methods: {
  toggleNav(){
    this.navIsOpen = !this.navIsOpen;
    document.querySelector('html').classList.toggle('freeze');
    document.querySelector('body').classList.toggle('freeze');
  },
  handleAboutClick() {
      window.location.href = window.location.origin;
  }
}
};
</script>

<style src="../../assets/scss/dock-nav.scss" lang="scss" scoped>

</style>
