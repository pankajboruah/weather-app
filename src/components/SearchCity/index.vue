<template>
  <div class="SearchBar" v-if="currentCity">
    <svg viewBox="0 0 512 512" class="SearchBar_icon">
      <path
        d="M256 0C153.755 0 70.573 83.182 70.573 185.426c0 126.888 165.939 313.167 173.004 321.035 6.636 7.391 18.222 7.378 24.846 0 7.065-7.868 173.004-194.147 173.004-321.035C441.425 83.182 358.244 0 256 0zm0 278.719c-51.442 0-93.292-41.851-93.292-93.293S204.559 92.134 256 92.134s93.291 41.851 93.291 93.293-41.85 93.292-93.291 93.292z"
      ></path>
    </svg>
    <input
      placeholder="Search"
      class="SearchBar_searchInput"
      v-model="cityName"
      type="text"
      @input="filterCities"
    />
    <button class="SearchBar_searchBtn">
      <svg viewBox="0 0 511.999 511.999" class="SearchBar_icon">
        <path
          d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z"
        ></path>
      </svg>
    </button>
    <SearchItems
      :cities="filteredCities"
      @handleCityChange="updateCity"
      v-if="isSearching"
    />
  </div>
</template>

<script>
import location from "../../assets/icons/location.svg";
import magnifyingGlass from "../../assets/icons/magnifyingGlass.svg";
import SearchItems from "../SearchItems";
import cities from "../../assets/cities.json";
export default {
  name: "SearchCity",
  components: {
    location,
    magnifyingGlass,
    SearchItems
  },
  data() {
    return {
      cities: [],
      filteredCities: [],
      cityName: "",
      isSearching: false
    };
  },
  props: {
    currentCity: {
      type: Object,
      default: {
        name: "Guwahati",
        coord: {
          lat: 26.1833,
          lon: 91.7454
        }
      }
    }
  },
  mounted() {
    this.cities = cities;
    this.updateCity(this.currentCity);
  },
  methods: {
    filterCities() {
      if (this.cityName.length < 2) {
        this.isSearching = false;
        return;
      }
      this.filteredCities = this.cities.filter(city =>
        city.name.toLowerCase().includes(this.cityName.toLowerCase())
      );
      // this.filteredCities.forEach((city, idx) => this.getCityData(city, idx));
      this.isSearching = true;
    },
    // getCityData(city, idx) {
    //   fetch(
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=59aee9fd3658db1644f57f5fe0218034`
    //   )
    //     .then(res => {
    //       if (res.status == 200) {
    //         return res.json();
    //       }
    //     })
    //     .then(data => {
    //       if (data) {
    //         this.filteredCities[idx].temp = Math.floor(data.main.temp);
    //         this.filteredCities[idx].weather = data.weather[0].main;
    //       }
    //     })
    //     .catch(err => console.log(err))
    //     .finally(() => (this.isSearching = false));
    // },
    updateCity(city) {
      this.isSearching = false;
      this.cityName = city.name;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&cnt=20&units=metric&appid=59aee9fd3658db1644f57f5fe0218034`
      )
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(data => {
          if (data) {
            this.$emit("updateCityWeatherForecast", data);
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: {}
};
</script>

<style scoped>
.SearchBar {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1.5rem;
}
.SearchBar_icon {
  position: absolute;
  left: 1rem;
  height: 1.25rem;
  width: 1.25rem;
}
.SearchBar_searchInput {
  box-shadow: 0px 2px 8px -3px;
  border-radius: 8px;
  border: none;
  display: block;
  height: 0rem;
  padding: 1.75rem 1.75rem 1.75rem 3rem;
  font-weight: 600;
  text-transform: capitalize;
  transition: box-shadow 0.2s ease;
  width: 100%;
}
.SearchBar_searchInput:focus {
  outline: none;
  box-shadow: 0 0 1px 2px #00a6fa;
}
.SearchBar_searchBtn {
  background: transparent;
  padding: 0;
  border: none;
  position: absolute;
  right: 4rem;
  top: 1rem;
  margin: 0;
}
</style>
