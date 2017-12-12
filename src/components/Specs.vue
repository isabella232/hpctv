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
        <small-modal v-for="(point, i ) in pointsOfInterest" :key="point.modalData.title" :data="point">
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
      pointsOfInterest: [
        {
          x: 9,
          y: 35,
          modalData: {
            title: 'Heat Output',
            body: 'Cheyenne is hot!',
            media: '/static/img/modal-placeholder.jpg'
          }
        },
        {
          x: 22,
          y: 68,
          modalData: {
            title: 'Data Transfer Rate',
            body: 'Cheyenne is fast!',
            media: '/static/img/modal-placeholder.jpg'
          }
        },
        {
          x: 55,
          y: 16,
          modalData: {
            title: 'Processing Cores',
            body: 'Cheyenne is smart!',
            media: '/static/img/modal-placeholder.jpg'
          }
        },
        {
          x: 81,
          y: 16,
          modalData: {
            title: 'Total Memory',
            body: 'Cheyenne is a great multitasker',
            media: '/static/img/modal-placeholder.jpg'
          }
        },
        {
          x: 50,
          y: 59,
          modalData: {
            title: 'Performance',
            body: 'Cheyenne is the best.',
            media: '/static/img/modal-placeholder.jpg'
          }
        }
      ],
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

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('specs-page');
  }
};
</script>

<style src="../scss/specs.scss" lang="scss"></style>