<template>
  <div id="app">
    <side-nav></side-nav>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <footer class="app-footer" v-if="$route.path == '/'">
      <ul class="sponsors row center">
        <li><img src="/static/img/sponsor-logo-cisl.png" alt="Sponsored by CISL"></li>
        <li><img src="/static/img/sponsor-logo-nsf.png" alt="Sponsored by NSF"></li>
        <li><img src="/static/img/sponsor-logo-nwsc.png" alt="Sponsored by NWSC"></li>
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
    return {
      orderedRoutes: ['/', 'specs', 'live-data', 'projects'],
      transitionName: 'forward-full-page-slide'
    };
  },

  watch: {
    /**
      * Determines based on index in orderedRoutes which direction screen should slide. Transitions are defined in global.scss
      * @param {Object} to Automatically passed by router. the users current route information
      * @param {Object} from Automatically passed by router. The users selected destination route information.
      */

    $route(to, from) {
      if (this.orderedRoutes.indexOf(to.name) > this.orderedRoutes.indexOf(from.name)) {
        this.transitionName = 'forward-full-page-slide';
      } else {
        this.transitionName = 'backward-full-page-slide';
      }
    }
  }
};
</script>

<style src="./scss/global.scss" lang="scss"></style>