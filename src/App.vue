<template>
  <div id="app">
    <side-nav />
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <footer class="app-footer" v-if="$route.path == '/'">
      <ul class="sponsors row around">
        <li><img src="/static/img/sponsor-logo-cisl.png" alt="CISL Logo"></li>
        <li><img src="/static/img/sponsor-logo-nsf.png" alt="NSF Logo" style="height:65px"></li>
        <li><img src="/static/img/sponsor-logo-ncar-ucar.png" alt="UCAR / NCAR Logo"></li>
        <li><img src="/static/img/sponsor-logo-nwsc.png" alt="NWSC Logo"></li>
      </ul>
    </footer>

    <footer class="sponsor-bugs" v-else>
      <ul class="sponsors row around">
        <li><img src="/static/img/sponsor-logo-nsf.png" alt="NSF Logo" style="height:65px"></li>
        <li><img src="/static/img/sponsor-logo-ncar-ucar.png" alt="UCAR / NCAR Logo"></li>
      </ul>
    </footer>
  </div>
</template>
    
<script>
import SideNav from './components/modals-navs/Side-Nav';
import flexibility from '../static/flexibility';

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
  },

  mounted() {
    flexibility(document.querySelector('#app'));
  }
};
</script>

<style src="./scss/global.scss" lang="scss"></style>