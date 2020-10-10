<script>
import tempChart from "../../mixins/tempChart"
export default{
    name: "ForecastChart",
    mixins: [
        tempChart
    ],
    props: {
        height: {
            type: String | Number
        },
        width: {
            type: String | Number,
        }
    }
}
</script>