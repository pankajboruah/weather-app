<template>
  <div class="DailyForecasts_dailyForecastContainer">
    <input
      type="radio"
      class="DailyForecasts_activeForecastSelector"
      name="day"
      :value="value"
      @change="selectDay(value)"
    />
    <div
      :class="[
        'DailyForecasts_dailyForecast',
        value == selectedDay ? 'active' : ''
      ]"
    >
      <p>{{ dayOfWeek }}</p>
      <p>
        <span>{{ maxTemp }}°</span>
        <span class="text-lighter">{{ minTemp }}°</span>
      </p>
      <img class="DailyForecasts_forecastIcon" :src="weatherIcon" />
      <p class="text-lighter">{{ day.weather }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyForecastCard",
  data() {
    return {};
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    day: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    computedClass() {
      return this.value == this.selectedDay ? "active" : "";
    },
    dayOfWeek() {
      switch (this.value) {
        case 0:
          return "Sun";
        case 1:
          return "Mon";
        case 2:
          return "Tue";
        case 3:
          return "Wed";
        case 4:
          return "Thu";
        case 5:
          return "Fri";
        case 6:
          return "Sat";
        case 7:
          return "Sun";
      }
    },
    maxTemp() {
      return Math.floor(this.day.temp.max);
    },
    minTemp() {
      return Math.floor(this.day.temp.min);
    },
    weatherIcon() {
      switch (this.day.weather) {
        case "Rain":
          return "/dist/rainy.svg?a19df7e92b35ec3af9eeac4c6d5efb84";
        case "Clouds":
          return "/dist/cloudy.svg?849e970e8ff7fb60320f9e3172b721b4";
        case "Clear":
          return "/dist/sunny.svg?edade9d6a9ccb6debdd73dde536773ad";
      }
    }
  },
  methods: {
    selectDay(value) {
      this.$emit("updateDay", value);
    }
  }
};
</script>

<style scoped>
.DailyForecasts_dailyForecastContainer {
  position: relative;
  margin: 0.25rem;
  width: 90px;
  height: 122px;
}
.DailyForecasts_activeForecastSelector {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  left: 0;
}
.DailyForecasts_dailyForecast {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
}
.DailyForecasts_forecastIcon {
  margin: 0.5rem;
  width: 27px;
}
.text-lighter {
  color: #919393;
}
p {
  margin: 0 0 0.25rem;
  font-weight: 600;
}
.active {
  background: #fffdf7;
  box-shadow: 0 0 1px 3px #00a6fa;
  transition: box-shadow 0.3s ease-in;
}
</style>
