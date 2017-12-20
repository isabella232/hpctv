<template>
  <div class="live-data">
    <header class="row dead-center text-center upper">
      <h1>Real-Time Data.* Real Implications</h1>
    </header>

    <main class="row reverse">
      <div class="three-modal" v-if="threeModal.show" :style="{top: threeModal.y, left: threeModal.x}">
        <button @click="threeModal.show = false"> close </button>
        <p> &lbrace; modalText &rbrace;</p>
      </div>
      <article class="col">
        <div class="primary col around">
          <div class="row center core-tabs">
            <div :class="{active: activeTab === 'user allocation'}" @click="setActiveTab('user allocation')" tabindex="-1">
              <span>User Allocation</span>
            </div>
            <div class="angle-button" :class="{active: activeTab === 'area of study'}" @click="setActiveTab('area of study')" tabindex="-1">
              <span>Area of Study</span>
            </div>
          </div>
          <div class="canvas">
            <three @canvasWasTouched="insertModal($event)" />
          </div>
        </div>
        <div class="graph">
          <header>
            <h2>Calculation Speed + Data Output</h2>
          </header>
          <div class="canvas">
          </div>
        </div>
      </article>

      <aside class="projects col around">
        <div class="collection">
          <header class="upper">
            <h2>Now Running</h2>
          </header>
          <ul>
            <StatCard v-for="stat in nowRunning" :key="stat.statName" :cardData="stat" />
          </ul>
        </div>

        <div class="collection">
          <header class="upper">
            <h2>Total Run</h2>
          </header>
          <ul>
            <StatCard v-for="stat in totalRun" :key="stat.statName" :card-data="stat" />
          </ul>
        </div>
      </aside>
    </main>
    <DockNav />
    <small class="grey">&nbsp;*Updated every 24 hours</small>
  </div>
</template>

<script>
import StatCard from './StatCard';
import DockNav from './modals-navs/DockNav';
import Three from './graphs/Three';

export default {
  name: 'live-data',
  data() {
    return {
      isDefaultPlaceholderImage: true,
      nowRunning: [
        {
          statName: 'Active Projects',
          iconPath: '/static/icon/projects-icon.svg',
          statNumber: 25000
        },
        {
          statName: 'Active Jobs',
          iconPath: '/static/icon/jobs-icon.svg',
          statNumber: 55000
        },
        {
          statName: 'Queued Projects',
          iconPath: '/static/icon/folder-check-mark-icon.svg',
          statNumber: 250
        }
      ],
      totalRun: [
        {
          statName: 'Projects Completed',
          statNumber: 55000
        },
        {
          statName: 'Jobs Completed',
          statNumber: 5000000
        },
        {
          statName: 'Core Hours Used',
          statNumber: 5000
        }
      ],
      threeModal: {
        show: false,
        x: 0,
        y: 0
      }
    };
  },
  components: {
    StatCard,
    DockNav,
    Three
  },

  computed: {
    activeTab() {
      return this.$store.state.liveData.activeTab;
    }
  },

  methods: {
    setActiveTab(tab) {
      this.$store.state.liveData.activeTab = tab;
      if (tab === 'user allocation') {
        this.$store.commit('colorScheme', 'cool');
      } else {
        this.$store.commit('colorScheme', 'warm');
      }
    },

    insertModal(event) {
      this.threeModal.x = `${event.mouseX}%`;
      this.threeModal.y = `${event.mouseY}%`;
      this.threeModal.show = true;
    }
  },

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('live-data-page');
  }
};
</script>

<style src="../scss/live-data.scss" lang="scss"></style>