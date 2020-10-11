<template>
  <section class="DetailedForecast_detailedContainer">
    <div class="DetailedForecast_currentTempContainer">
      <h1 class="DetailedForecast_currentTemp">
        {{ Math.floor(currentTemp) }}° C
      </h1>
      <img class="DetailedForecast_currentTempIcon" :src="weatherIcon" />
    </div>
    <tempChart
      width="736"
      height="250"
      :chart-data="temperatureData"
      class="DetailedForecast_graphContainer"
    />
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
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: [0, 0, 1, 0, 0]
          }
        ]
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
        labels: this.horizontalAxis.filter((el, i) => i > this.currentHour),
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "#00a6fa",
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
      }
    }
  }
};
</script>

<style scoped>
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
  overflow: scroll;
  margin-bottom: 2rem;
}
.DetailedForecast_currentTempIcon {
  height: 3em;
  margin-left: 1rem;
}
</style>
