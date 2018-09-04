<template>
  <div class="specs" @toggleWasClicked="allOff()">
    <header class="text-center upper grey page-header" @click="allOff()">
      <h1>Supercomputer Superspecs</h1>
      <span class="lime hint">Tap
        <span><img class="lime-filter" width="18px" src="/static/icon/plus-x-icon.svg" alt="+ in circle"></span> for details</span>
    </header>
    <main class="supercomputer">
      <div class="cheyenne-container">
        <img src="/static/img/supercomputer.png" alt="" class="computer">
        <small-modal v-if="!isMobile" v-for="point in vuex.pointsOfInterest" :key="point.modalData.title" :data="point" :ref="point.modalData.title | getRefName" />
      </div>

      <ul v-if="isMobile">
        <li v-for="point,i in vuex.pointsOfInterest" :key="point.modalData.title">
          <Accordion :instance="i">
            <span slot="header" class="lime bold upper">{{point.modalData.title}}</span>
            <p slot="content">
              <span class="subtitle">{{ point.modalData.subtitle }}</span>
              <br>
              <span>{{ point.modalData.body }}</span>
            </p>
          </Accordion>
        </li>
      </ul>
    </main>
    <slide-up-modal title="Glossary" ref="glossary">
      <legend class="legend">
        <dl class="legend-list col wrap" ref="glossaryInternals">
          <div class="legend-item" v-for="term in vuex.glossary" :key="term.title">
            <dt class="upper lime">{{ term.title }}</dt>
            <dd>
              {{ term.definition }}
            </dd>
          </div>
        </dl>
      </legend>
    </slide-up-modal>
    <dock-nav ref="nav" />

  </div>
</template>

<script>
import SmallModal from './modals-navs/Small-Modal';
import Accordion from './modals-navs/Accordion';
import DockNav from './modals-navs/DockNav';
import SlideUpModal from './modals-navs/SlideUpModal';

export default {
  name: 'specs',
  components: {
    SmallModal,
    Accordion,
    DockNav,
    SlideUpModal
  },

  data() {
    return {
      legendIsOpen: false,
      windowWidth: window.innerWidth
    };
  },

  methods: {
    /**
     * Called by the child components to make sure only one modal is on at a time.
     */
    allOff() {
      const modals = Object.values(this.$children);
      modals.forEach(element => {
        element.$data.visible = false;
      });
    },

    beginAutoplay() {
      console.log('beginning autoplay');
      const router = this.$router;
      const page = this.$refs;

      this.automate([
        // {delay: 2000, trigger() {page.glossary.legendIsOpen = true;}},
        // {delay: 15000,trigger() {page.glossaryInternals.scrollTo({ left: 1000, behavior: 'smooth' });}},
        // {delay: 7000,trigger() {page.glossary.legendIsOpen = false;}},

        {
          delay: 4000,
          trigger() {
            page.heatOutput[0].toggle();
          }
        },
        {
          delay: 6000,
          trigger() {
            page.heatOutput[0].toggle();
          }
        },

        {
          delay: 2000,
          trigger() {
            page.dataTransferRate[0].toggle();
          }
        },
        {
          delay: 2500,
          trigger() {
            page.dataTransferRate[0].$refs.smallModalText.scrollTo({ top: 200, behavior: 'smooth' });
          }
        },
        {
          delay: 6000,
          trigger() {
            page.dataTransferRate[0].toggle();
          }
        },

        {
          delay: 2000,
          trigger() {
            page.performance[0].toggle();
          }
        },
        {
          delay: 6000,
          trigger() {
            page.performance[0].toggle();
          }
        },

        {
          delay: 2000,
          trigger() {
            page.processingCores[0].toggle();
          }
        },
        {
          delay: 2500,
          trigger() {
            page.processingCores[0].$refs.smallModalText.scrollTo({ top: 200, behavior: 'smooth' });
          }
        },
        {
          delay: 6000,
          trigger() {
            page.processingCores[0].toggle();
          }
        },

        {
          delay: 2000,
          trigger() {
            page.totalMemory[0].toggle();
          }
        },
        {
          delay: 6000,
          trigger() {
            page.totalMemory[0].toggle();
          }
        },

        {
          delay: 3000,
          trigger() {
            router.push('live-data');
          }
        }
      ]);
    }
  },

  computed: {
    vuex() {
      return this.$store.state.specs;
    },
    isMobile() {
      return this.windowWidth < 768;
    }
  },

  filters: {
    getRefName(title) {
      // human to camelcase.
      return title
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
          return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        })
        .replace(/\s+/g, '');
    }
  },

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList.remove('home-page', 'project-page', 'specs-page', 'live-data-page');
    document.body.classList.add('specs-page');
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }
};
</script>

<style src="../scss/specs.scss" lang="scss"></style>