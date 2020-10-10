import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
        height: {
            type: String | Number
        },
        width: {
            type: String | Number,
        }
    },
  mounted () {
    this.renderChart(
      this.chartData
    )
  }
}