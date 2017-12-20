<template>
  <div class="specs" @toggleWasClicked="allOff()">
    <header class="text-center upper grey" @click="allOff()">
      <h1>Supercomputer Superspecs</h1>
      <span class="lime hint">Tap
        <span><img class="lime-filter" width="18px" src="/static/icon/plus-x-icon.svg" alt="+ in circle"></span> for details</span>
    </header>
    <main class="supercomputer">
      <div class="cheyenne-container">
        <img src="/static/img/supercomputer.png" class="computer">
        <small-modal v-for="(point, i) in vuex.pointsOfInterest" :key="point.modalData.title" :data="point">
        </small-modal>
      </div>
    </main>
    <slide-up-modal></slide-up-modal>
    <dock-nav></dock-nav>

  </div>
</template>

<script>
import SmallModal from './modals-navs/Small-Modal';
import DockNav from './modals-navs/DockNav';
import SlideUpModal from './modals-navs/SlideUpModal';

export default {
  name: 'specs',
  components: {
    SmallModal,
    DockNav,
    SlideUpModal
  },

  data() {
    return {
      legendIsOpen: false
    };
  },

  methods: {
    /**
      * Called by the child comopnents to make sure only one modal is on at a time.
      */
    allOff() {
      const modals = Object.values(this.$children);
      modals.forEach(element => {
        element.$data.visible = false;
      });
    }
  },

  computed: {
    vuex() {
      return this.$store.state.specs;
    }
  },

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('specs-page');
  }
};
</script>

<style src="../scss/specs.scss" lang="scss"></style>