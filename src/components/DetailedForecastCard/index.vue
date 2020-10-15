<template>
  <section class="DetailedForecast_detailedContainer">
    <div class="DetailedForecast_currentTempContainer">
      <h1 class="DetailedForecast_currentTemp">
        {{ Math.floor(currentTemp) }}° C
      </h1>
      <img class="DetailedForecast_currentTempIcon" :src="weatherIcon" />
    </div>
    <div class="DetailedForecast_graphContainer">
      <tempChart
        width="736"
        height="250"
        :chart-data="temperatureData"
        :options="weatherOptions"
        class="DetailedForecast_graph"
      />
    </div>
    <div class="DetailedForecast_secondaryStatsContainer">
      <div class="DetailedForecast_secondaryStats">
        <span class="bold" style="display: flex">Pressure</span
        ><span style="display: flex">{{ pressure }} hpa</span>
      </div>
      <div class="DetailedForecast_secondaryStats">
        <span class="bold" style="display: flex">Humidity</span
        ><span style="display: flex">{{ humidity }} %</span>
      </div>
    </div>
    <div class="DetailedForecast_sunriseStatsContainer">
      <div class="DetailedForecast_sunriseStats">
        <span class="bold" style="display: flex">Sunrise</span>
        <span style="display: flex" class="text-lighter">6:31am</span>
      </div>
      <div class="DetailedForecast_sunriseStats">
        <span class="bold" style="display: flex">Sunset</span>
        <span style="display: flex" class="text-lighter">6:18pm</span>
      </div>
    </div>
    <tempChart
      width="736"
      height="200"
      :chart-data="time"
      :options="timeOptions"
      style="overflow: scroll;"
    />
  </section>
</template>

<script>
import tempChart from "./mixins/tempChart.js";
export default {
  name: "DetailedForecastCard",
  components: {
    tempChart
  },
  props: {
    hourlyData: {
      type: Array,
      required: true
    },
    currentHour: {
      type: Number,
      required: true,
      default: 0
    },
    humidity: {
      type: Number,
      required: true,
      default: 0
    },
    pressure: {
      type: Number,
      required: true,
      default: 0
    },
    selectedDay: {
      type: Number,
      required: true,
      default: 0
    },
    currentTemp: { type: Number, required: true, default: 25 },
    currentWeather: { type: String, required: true, default: "Rainy" }
  },
  data() {
    return {
      horizontalAxis: [
        "12am",
        "1am",
        "2am",
        "3am",
        "4am",
        "5am",
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
        "8pm",
        "9pm",
        "10pm",
        "11pm"
      ],
      time: {
        labels: ["5am", "", "3am", "", "7pm"],
        datasets: [
          {
            label: "Sunrise",
            backgroundColor: "#fcf5e4",
            borderWidth: 1,
            pointRadius: 0,
            data: [0, 0, 1, 0, 0]
          }
        ]
      },
      timeOptions: {
        aspectRatio: 2,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                stepSize: 0.5,
                max: 1.4
              },
              gridLines: {
                display: false
              },
              display: false
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
        tooltips: {
          enabled: false
        },
        responsive: true,
        maintainAspectRatio: false,
        hover: true
      },
      weatherOptions: {
        aspectRatio: 2,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                stepSize: 6,
                sampleSize: 6,
                min: 0,
                max: 45
              },
              gridLines: {
                display: false
              },
              display: false
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: false,
                stepSize: 1.5,
                sampleSize: 6
              },
              gridLines: {
                display: true,
                lineWidth: 3,
                zeroLineWidth: 3,
                zeroLineColor: "#e5e5e5"
              }
            }
          ]
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: "index"
        },
        animation: {
          duration: 500,
          easing: "easeOutQuint"
        },
        responsive: true,
        maintainAspectRatio: false,
        pointStyle: "star"
      }
    };
  },
  computed: {
    hourlyTemp() {
      let res = this.hourlyData.map((el, i) => el.temp);
      return res;
    },
    temperatureData() {
      return {
        labels:
          this.selectedDay == 0
            ? this.horizontalAxis.filter((el, i) => i > this.currentHour)
            : this.horizontalAxis,
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "#00a6fa",
            pointRadius: 5,
            pointBackgroundColor: "white",
            pointBorderColor: "#00a6fa",
            pointBorderWidth: 2,
            pointHitRadius: 2,
            pointHoverRadius: 5,
            hoverBorderWidth: 2,
            data: this.hourlyTemp
          }
        ]
      };
    },
    weatherIcon() {
      switch (this.currentWeather) {
        case "Mist":
        case "Rain":
          return "/dist/rainy.svg?a19df7e92b35ec3af9eeac4c6d5efb84";
        case "Haze":
        case "Clouds":
          return "/dist/cloudy.svg?849e970e8ff7fb60320f9e3172b721b4";
        case "Clear":
          return "/dist/sunny.svg?edade9d6a9ccb6debdd73dde536773ad";
        default:
          return "/dist/rainy.svg?a19df7e92b35ec3af9eeac4c6d5efb84";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.DetailedForecast_detailedContainer {
  border-radius: 8px;
  box-shadow: 0px 2px 8px -3px;
  padding: 1.5rem 1rem 0;
}
.DetailedForecast_currentTempContainer {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;
}
.DetailedForecast_currentTemp {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
.DetailedForecast_secondaryStatsContainer {
  display: flex;
  margin-bottom: 3rem;
}
.DetailedForecast_secondaryStats {
  background: #f3fbff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
}
.DetailedForecast_secondaryStats:first-child {
  margin-right: 0.5rem;
}
.DetailedForecast_sunriseStatsContainer {
  display: flex;
  justify-content: space-between;
}
.DetailedForecast_sunriseStats {
  display: flex;
  flex-direction: column;
}
.DetailedForecast_graphContainer {
  overflow-x: scroll;
  margin-bottom: 2rem;
  > .DetailedForecast_graph {
    height: 250px;
    width: 1400px;
  }
}
.DetailedForecast_currentTempIcon {
  height: 3em;
  margin-left: 1rem;
}
</style>
