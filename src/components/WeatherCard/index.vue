<template>
  <div>
    <SearchCity
      @updateCityWeatherForecast="updateCityWeatherForecast"
      :currentCity="currentCity"
    />
    <div class="pv-30 mv-60" v-if="isLoadingWeatherDetails">
      <CircularLoader
        label="Please wait while we fetch weather details..."
        :fontSize="20"
      />
    </div>
    <div v-else>
      <section class="DailyForecasts_forecastsContainer">
        <DailyForecastCard
          v-for="(day, idx) in cityWeatherForecast.daily"
          :key="idx"
          :value="idx"
          :day="{ temp: day.temp, weather: day.weather[0].main }"
          :selectedDay="selectedDay"
          @updateDay="updateDay"
        />
      </section>
      <DetailedForecastCard
        :hourlyData="computedHourlyData"
        :currentHour="currentHour"
        :selectedDay="selectedDay"
        :humidity="cityWeatherForecast.current.humidity"
        :pressure="cityWeatherForecast.current.pressure"
      ></DetailedForecastCard>
    </div>
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
      currentCity: { coord: { lat: 0, lon: 0 }, name: "" },
      isLoadingWeatherDetails: true,
      cityWeatherForecast: {},
      selectedDay: 0,
      currentHour: 0
    };
  },
  computed: {
    computedHourlyData() {
      let res = [...this.cityWeatherForecast.hourly];
      if (this.selectedDay == 0) {
        res.length = 24 - this.currentHour;
      } else {
        res.splice(0, 24 - this.currentHour + 24 * (this.selectedDay - 1));
        res.length = 24;
      }
      return res;
    }
  },
  methods: {
    getCurrentTime() {
      let d = new Date();
      this.currentHour = d.getHours();
    },
    updateCityWeatherForecast(value) {
      this.cityWeatherForecast = value;
      this.isLoadingWeatherDetails = false;
    },
    updateDay(value) {
      this.selectedDay = value;
    },
    getCityData(lat, lon) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=59aee9fd3658db1644f57f5fe0218034`
      )
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(data => {
          if (data) {
            this.currentCity = data.name;
          }
        })
        .catch(err => console.log(err));
    },
    getGeoLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function success(position) {
            console.log(
              "latitude",
              position.coords.latitude,
              "longitude",
              position.coords.longitude
            );
          },
          function error(error_message) {
            console.error(
              "An error has occured while retrieving location",
              error_message
            );
          }
        );
      } else {
        console.log("geolocation is not enabled on this browser");
      }
    },
    getCurrentLocation() {
      fetch("https://freegeoip.app/json/")
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(data => {
          if (data) {
            this.currentCity.coord.lat = data.latitude;
            this.currentCity.coord.lon = data.longitude;
            this.currentCity.name = data.city;
          }
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getCurrentTime();
    this.getGeoLocation();
    this.getCurrentLocation();
  }
};
</script>

<style scoped>
.DailyForecasts_forecastsContainer {
  display: flex;
  font-size: 0.95rem;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 1.5rem;
  white-space: nowrap;
}
</style>
