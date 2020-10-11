import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    height: {
      type: String | Number
    },
    width: {
      type: String | Number
    }
  },
  data() {
    return {
      options: {
        aspectRatio: 2,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: false,
                stepSize: 1.5
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
