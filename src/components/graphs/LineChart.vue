<script>
import { Line, mixins } from 'vue-chartjs';

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          easing: 'easeInOutQuart'
        },
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

  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style src="../../assets/scss/line-graph.scss" lang="scss" scoped />;
