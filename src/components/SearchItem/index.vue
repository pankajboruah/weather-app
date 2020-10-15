<template>
  <div
    class="SearchList_searchListItem"
    @click="selectCity(city)"
    v-if="!isFetchingData"
  >
    <span v-html="city.name"></span>
    <div class="weatherMeta">
      <div class="temperature">
        <span>{{ temp }}° C</span>
        <span class="text-lighter">{{ weather }}</span>
      </div>
      <img class="SearchList_weatherIcon" :src="weatherIcon" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  data() {
    return {
      isFetchingData: false,
      temp: 0,
      weather: ""
    };
  },
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectCity(city) {
      city.name = city.name
        .split("<b>")
        .join("")
        .split("</b>")
        .join("");
      this.$emit("handleCityChange", city);
    },
    getCityData(city, idx) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=59aee9fd3658db1644f57f5fe0218034`
      )
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(data => {
          if (data) {
            this.temp = Math.floor(data.main.temp);
            this.weather = data.weather[0].main;
          }
        })
        .catch(err => console.log(err))
        .finally(() => (this.isFetchingData = false));
    }
  },
  computed: {
    weatherIcon() {
      switch (this.weather) {
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
  },
  mounted() {
    this.isFetchingData = true;
    this.getCityData(this.city);
  }
};
</script>

<style scoped>
.SearchList_searchListItem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
}
.SearchList_weatherIcon {
  height: 40px;
  width: 40px;
  margin-left: 0.5rem;
}
.weatherMeta {
  display: flex;
  justify-content: space-between;
}
.temperature {
  display: flex;
  flex-direction: column;
}
</style>
