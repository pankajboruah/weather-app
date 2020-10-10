<template>
  <section class="DetailedForecast_detailedContainer">
    <div class="DetailedForecast_currentTempContainer">
      <h1 class="DetailedForecast_currentTemp">29° C</h1>
      <img class="DetailedForecast_currentTempIcon" src="../../assets/icons/rainy.svg"/>
    </div>
    <tempChart width="736" height="250" :chart-data="temperatureData"/>
    <div class="DetailedForecast_secondaryStatsContainer">
      <div class="DetailedForecast_secondaryStats"><span class="bold" style="display: flex">Pressure</span><span style="display: flex">1008 hpa</span></div>
      <div class="DetailedForecast_secondaryStats"><span class="bold" style="display: flex">Humidity</span><span style="display: flex">77 %</span></div>
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
    <tempChart width="736" height="200" :chart-data="time"/>
  </section>
</template>

<script>
import tempChart from "./mixins/tempChart.js"
export default {
  name: "DetailedForecastCard",
  components: {
    tempChart
  },
  data(){
    return {
      temperatureData: {
        labels: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],
        datasets: [
          {
            label:"Temperature",
            backgroundColor: '#1e5799',
            data: [22, 20, 23, 39, 21, 24, 29, 20, 24, 22, 22, 21]
          }
        ]
      },
      time: {
        labels: ['5am', '', '3am','' , '7pm'],
        datasets: [
          {
            label:"Sunrise",
            backgroundColor: '#1e5799',
            data: [0, 0, 1, 0, 0]
          }
        ]
      }
    }
  }

};
</script>

<style scoped>
.DetailedForecast_detailedContainer{
  border-radius: 8px;
  box-shadow: 0px 2px 8px -3px;
  padding: 1.5rem 1rem 0;
}
.DetailedForecast_currentTempContainer {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;
}
.DetailedForecast_currentTemp{
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
.DetailedForecast_secondaryStatsContainer{
    display: flex;
    margin-bottom: 3rem;
}
.DetailedForecast_secondaryStats{
  background: #f3fbff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem .75rem;
}
.DetailedForecast_secondaryStats:first-child {
  margin-right: .5rem;
}
.DetailedForecast_sunriseStatsContainer{
  display: flex;
  justify-content: space-between;
}
.DetailedForecast_sunriseStats{
  display: flex;
  flex-direction: column;
}
.DetailedForecast_currentTempIcon{
  height: 3em;
  margin-left: 1rem;
}
</style>