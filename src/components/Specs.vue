<template>
  <div class="specs">
    <header class="text-center upper grey">
      <h1>Supercomputer Superspecs</h1>
      <span class="lime">Tap + for details</span>
    </header>
    <main class="supercomputer">
      <div class="cheyenne-container">
        <img src="/static/img/supercomputer.png" class="computer">
        <small-modal v-for="(point, i ) in pointsOfInterest" :key="point.modalData.title" :data="point" ></small-modal>
      </div>
    </main>
    <dock-nav></dock-nav>
  </div>
</template>

<script>
import SmallModal from './Small-Modal';
import DockNav from './DockNav';

export default {
  name: 'specs',
  components: {
    SmallModal,
    DockNav
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
      ]
    };
  },

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('specs-page');
  }
};
</script>

<style src="../scss/specs.scss" lang="scss"></style>