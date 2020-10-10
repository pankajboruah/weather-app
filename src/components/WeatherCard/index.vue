<template>
  <div>
    <SearchCity></SearchCity>
    <!-- <div class="pv-30 mv-60" v-if="isLoadingWeatherDetails">
      <CircularLoader
        label="Please wait while we fetch weather details..."
        :fontSize="20"
      />
    </div>
    <div v-else>loaded weather forecast</div> -->
    <section class="DailyForecasts_forecastsContainer">
      <DailyForecastCard v-for="(day,idx) in 8" :key="idx" :value="idx"/>
    </section>
    <DetailedForecastCard></DetailedForecastCard>
  </div>
</template>

<script>
import SearchCity from "../SearchCity";
import DetailedForecastCard from "../DetailedForecastCard";
import DailyForecastCard from "../DailyForecastCard";
import CircularLoader from "../../widgets/CircularLoader";
export default {
  name: "WeatherCard",
  components: {
    SearchCity,
    DetailedForecastCard,
    CircularLoader,
    DailyForecastCard
  },
  data() {
    return {
      isLoadingWeatherDetails: true
    };
  }
};
</script>

<style scoped>
.DailyForecasts_forecastsContainer{
  display: flex;
  font-size: .95rem;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 1.5rem;
  white-space: nowrap;
}
</style>