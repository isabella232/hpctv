<template>
  <div class="col dead-center not-found">
    <h1>View not found</h1>
    <router-link to="/">Back to Home</router-link>
    <h2>Show Component:</h2>
    <ul class="row around" style="width:80%">
      <li @click="activeComponent = 'line'">Line Chart</li>
      <li @click="activeComponent = 'three'">Three JS</li>
    </ul>
    <line-chart v-if="activeComponent == 'line'" :cssClasses="'line-graph'" :width="1000" :chartData="chartData" />
  </div>
</template>

<script>
import LineChart from './graphs/LineChart.vue';
export default {
  components: {
    LineChart: LineChart
  },

  data() {
    return {
      activeComponent: 'line',
      chartData: {
        labels: null,
        datasets: [
          {
            label: 'Power',
            backgroundColor: 'rgba(0,255,255,0.5)',
            data: [1, 0, 1, 0, 1],
            pointRadius: 0,
            borderWidth: 2,
            type: 'line'
          }
        ]
      }
    };
  },

  methods: {
    changeData() {
      console.log('clicked');
      const newData = [];
      for (let i = 0; i < this.chartData.labels.length; i++) {
        newData[i] = Math.floor(Math.random() * 11);
      }
      this.chartData = {
        labels: this.getArrayofSize(11),
        datasets: [
          {
            label: 'power',
            backgroundColor: 'rgba(0,255,255,0.5)',
            data: this.getNextSequence(),
            pointRadius: 0,
            borderWidth: 2,
            type: 'line'
          }
        ]
      };
    },

    getArrayofSize(num) {
      return Array.from(new Array(num).keys());
    },

    getNextSequence() {
      const currentData = this.chartData.datasets[0].data.slice();
      currentData.shift();
      currentData.push(Math.floor(Math.random() * 11));
      return currentData;
    }
  },

  created() {
    document.body.classList = '';
    this.chartData.labels = this.getArrayofSize(11);
    for (let i = 0; i < this.chartData.labels.length; i++) {
      this.chartData.datasets[0].data[i] = Math.floor(Math.random() * 11);
    }
  },

  mounted() {
    document.getElementById('line-chart').addEventListener('click', this.changeData);
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';
li {
  cursor: pointer;
}
</style>
