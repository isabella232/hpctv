<template>
  <div id="app">
    <side-nav></side-nav>
    <transition :name="transitionDirection">
      <router-view></router-view>
    </transition>
    <footer class="app-footer" v-if="$route.path == '/'">
      <ul class="sponsors row center">
        <li><img src="https://placehold.it/200x50" alt=""></li>
        <li><img src="https://placehold.it/200x50" alt=""></li>
        <li><img src="https://placehold.it/200x50" alt=""></li>
      </ul>
    </footer>
  </div>
</template>
    
<script>
import SideNav from './components/modals-navs/Side-Nav';

export default {
  name: 'app',
  components: {
    SideNav
  },
  data() {
    return { slideDirection: 1 };
  },

  computed: {
    transitionDirection() {
      return this.slideDirection > 0 ? 'forward-full-page-slide' : 'backward-full-page-slide';
    }
  }
};
</script>

<style src="./scss/global.scss" lang="scss"></style>