<template>
  <div class="live-data">
    <ThreeModal :data="threeModal" :showButton="true"/>
    <header class="row dead-center text-center upper page-header">
      <h1>Real-Time Data.* Real Implications</h1>
    </header>

    <main class="row reverse">

      <section class="col data-viz">
        <div class="primary col around">
          <div class="row center core-tabs">
            <div :class="['user-alloc tab', {active: activeTab === 'facility allocation'}]" @click="setActiveTab('facility allocation')" tabindex="-1">
              <span>Facility Allocation</span>
            </div>

            <div class="area-of-study tab" :class="{active: activeTab === 'area of study'}" @click="setActiveTab('area of study')" tabindex="-1">
              <span>Area of Study</span>
            </div>
          </div>

          <div class="canvas">
            <three @canvasWasTouched="insertModal($event)" />
          </div>
        </div>
        <div class="graph">
          <header>
            <h2>Jobs Running</h2>
          </header>
          <div class="canvas">
            <LineChart :cssClasses="'line-graph'" :width="1000" :chartData="chartData"></LineChart>
          </div>
        </div>
      </section>

      <aside class="projects col side-stats">
        <div class="collection">
          <header class="upper">
            <!-- Machine Log -->
            <h2>Now Running</h2>
          </header>
          <ul>
            <StatCard v-for="stat in nowRunning" :key="stat.statName" :cardData="stat" />
          </ul>
        </div>

        <div class="collection">
          <header class="upper">
            <!-- Machine Total -->
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
import LineChart from './graphs/LineChart';
import ThreeModal from './modals-navs/ThreeModal';
import axios from 'axios';

export default {
  name: 'live-data',
  /**
   * All Data inside this property is currently a fallback data point if the API returns a 503 response.
   */
  data() {
    return {
      nowRunning: [
        {
          statName: 'Active Projects',
          iconPath: '/static/icon/projects-icon.svg',
          statNumber: 0
        },
        {
          statName: 'Active Jobs',
          iconPath: '/static/icon/jobs-icon.svg',
          statNumber: 0
        }
      ],
      totalRun: [
        {
          statName: 'Projects Completed',
          statNumber: 0
        },
        {
          statName: 'Jobs Completed',
          statNumber: 0
        },
        {
          statName: 'Core Hours Used',
          statNumber: 0
        }
      ],
      threeModal: {
        x: 0,
        y: 0,
        modalData: {
          title: '',
          subtitle: '',
          body: '',
        }
      }, 
      rawResponse: null,
      chartData: {
        labels: null,
        datasets: [
          {
            label: 'Jobs',
            backgroundColor: 'rgba(0,255,255,0.5)',
            data: null,
            pointRadius: 0,
            borderWidth: 2,
            type: 'line'
          }
        ]
      }
    };
  },
  components: {
    StatCard,
    DockNav,
    Three,
    ThreeModal,
    LineChart
  },

  computed: {
    activeTab() {
      return this.$store.state.liveData.activeTab;
    },

    apiConfig() {
      return this.$store.state.apiConfig;
    },

    chartHeight() {
      return parseInt(
        getComputedStyle(document.querySelector('.canvas'))
          .getPropertyValue('height')
          .replace('px', '')
      );
    }
  },

  methods: {
    /**
     * Changes the tab at the top of the 3D model of cheyenne.
     * @param {String} tab the name of the tab in lower case human readable notation
     */
    setActiveTab(tab) {
      this.$store.state.liveData.activeTab = tab;
      if (tab === 'facility allocation') {
        this.$store.commit('activeTab', 'facility allocation');
      } else {
        this.$store.commit('activeTab', 'area of study');
      }
    },

    /**
     * Used to inject a modal on top of the 3D display giving data about the element that was clicked.
     * @param {Object} event automatically passed click event from the window.
     */
    insertModal(event) {
      // position info
      // this.threeModal.x = `${event.mouseX}%`;
      //data massaging to conform to small Modal type
      this.threeModal = {
        x: event.mouseX,
        y: event.mouseY,
        modalData: {
          title: event.data.group,
          subtitle: event.data.data.coreHours,
          body: event.data.body,
        }
      };

      this.threeModal.show = true;
    },

    getArrayofSize(num) {
      return Array.from(new Array(num).keys());
    },
    /**
     * Called by the child components to make sure only one modal is on at a time.
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
    document.body.classList.add('live-data-page');

    // Get today's statistics from the API.
    axios
      .get('report/log?daysAgo=1', this.apiConfig)
      .then(response => {
        if (response.status === 200) {
          // Successful
          console.log('%c API request: OK', 'color:lime');
          const data = response.data;
          this.nowRunning[0].statNumber = data.projects;
          this.nowRunning[1].statNumber = data.jobs;
        } else if (response.status === 503) {
          // handle if API is offline
          console.log('%c Cheyenne is offline.', 'color:goldenrod');
        } else {
          // Unexpected response like 404.
          console.log('API returned status code: ' + response.status);
        }
      })
      .catch(error => {
        console.log(`%c ${error}`, 'color:red');
      });

    // get ALL TIME stats from API
    axios
      .get('/report/total', this.apiConfig)
      .then(response => {
        if (response.status === 200) {
          // Successful response
          console.log('%c API request: OK', 'color:lime');
          const data = response.data;
          this.totalRun[0].statNumber = data.projects;
          this.totalRun[1].statNumber = data.jobs;
          this.totalRun[2].statNumber = data.coreHours;
        } else if (response.status === 503) {
          // handle if API is offline
          console.log('%c Cheyenne is offline.', 'color:goldenrod');
        } else {
          // Unexpected response like 404.
          console.log('API returned status code: ' + response.status);
        }
      })
      .catch(error => {
        console.log(`%c ${error}`, 'color:red');
      });

    // Get the pulse data
    axios
      .get('report/activity?daysAgo=60', this.apiConfig)
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          console.log('%c API request: OK', 'color:lime');
          this.chartData = {
            labels: data.entries.map(object => object.date.replace(/20\d\d-/i, '')),
            datasets: [
              // Jobs and users are NOT on a scale that both can be viewed. therefore one has to be chosen. Jobs seems to be a more interesting number.
              {
                label: 'Jobs',
                backgroundColor: 'rgba(0, 121, 124, 0.5)',
                data: data.entries.map(object => object.jobs),
                pointRadius: 0,
                borderWidth: 2,
                type: 'line'
              }
              // {
              //   label: 'Users',
              //   backgroundColor: 'rgba(0,255,255,0.5)',
              //   data: data.entries.map(object => object.users),
              //   pointRadius: 0,
              //   borderWidth: 2,
              //   type: 'line'
              // }
            ]
          };
        }
      })
      .catch(error => {
        console.log(`%c ${error}`, 'color:red');
      });
  }
};
</script>

<style src="../scss/live-data.scss" lang="scss"></style>