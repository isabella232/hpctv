<template>
  <div class="line-graph" @click="changeData()">
    <line-chart :chart-data="data" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js';

export default {
  components: { LineChart },

  data() {
    return {
      // See Chart.js properties here http://www.chartjs.org/docs/latest/
      data: null,

      dataset1: {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: 'Power',
            backgroundColor: 'rgba(0,255,255,0.5)',
            data: [10, 20, 15, 30, 15],
            pointRadius: 0,
            borderWidth: 2,
            type: 'line'
          }
        ]
      },
      dataset2: {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: 'Power',
            backgroundColor: 'rgba(125,0,255,0.5)',
            data: [5, 10, 25, 30, 15],
            pointRadius: 0,
            borderWidth: 2,
            type: 'line'
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                color: 'rgba(60,60,60,1)',
                lineWidth: 3
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
                color: 'rgba(60,60,60,1)',
                lineWidth: 3
              }
            }
          ]
        }
      }
    };
  },

  methods: {
    changeData() {
      console.log('click');
      this.data = this.dataset2;
    }
  },

  mounted() {
    this.data = this.dataset1;
  }
};
</script>

<style src="../../scss/line-graph.scss" lang="scss" scoped></style>
