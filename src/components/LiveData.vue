<template>
  <div class="live-data">
    <header class="row dead-center text-center upper">
      <h1>Near Real Time Data. Real Implications</h1>
    </header>

    <main class="row reverse">
      <article class="col">
        <div class="primary">
          <div class="row center core-tabs">
            <button :class="{active: isDefaultPlaceholderImage}" @click="isDefaultPlaceholderImage = !isDefaultPlaceholderImage">
              <span>User Allocation</span>
            </button>
            <button  class="angle-button" :class="{active: !isDefaultPlaceholderImage}" @click="isDefaultPlaceholderImage = !isDefaultPlaceholderImage">
              <span>Area of Study</span>
            </button>
          </div>
          <div class="canvas">
            <!-- <img src="/static/img/interactive-mockup.png" v-if="isDefaultPlaceholderImage" alt="">
            <img src="/static/img/warm-interactive-mockup.png" v-if="!isDefaultPlaceholderImage" alt=""> -->
            <three></three>
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
            <stat-card v-for="(stat, i) in nowRunning" :key="stat.statName" :cardData="stat">
            </stat-card>
          </ul>
        </div>

        <div class="collection">
          <header class="upper">
            <h2>Total Run</h2>
          </header>
          <ul>
            <stat-card v-for="(stat, i) in totalRun" :key="stat.statName" :cardData="stat">
            </stat-card>
          </ul>
        </div>
      </aside>
    </main>
    <dock-nav></dock-nav>
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
      ]
    };
  },
  components: {
    StatCard,
    DockNav,
    Three
  },

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('live-data-page');
  }
};
</script>

<style src="../scss/live-data.scss" lang="scss"></style>