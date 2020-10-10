<template>
  <div class="DailyForecasts_dailyForecastContainer">
    <input type="radio" class="DailyForecasts_activeForecastSelector" name="day" :value="value"></input>
    <div class="DailyForecasts_dailyForecast">
      <p>Sat</p>
      <p>
        <span>29°</span>
        <span class="text-lighter">28°</span>
      </p>
      <img class="DailyForecasts_forecastIcon" src="../../assets/icons/rainy.svg"/>
      <p class="text-lighter">Rain</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyForecastCard",
  props: {
    value: {
      type: String | Number,
      required: true
    }
  }
};
</script>

<style scoped>
.DailyForecasts_dailyForecastContainer{
  position: relative;
  margin: .25rem;
  width: 90px;
  height: 122px;
}
.DailyForecasts_activeForecastSelector{
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
    margin-right: .5rem;
}
.DailyForecasts_activeForecastSelector:checked~.DailyForecasts_dailyForecast {
    background: #fffdf7;
    box-shadow: 0 0 1px 3px #00a6fa;
    transition: box-shadow .3s ease-in;
}
.DailyForecasts_forecastIcon{
  margin: .5rem;
  width: 27px;
}
.text-lighter {
  color: #919393;
}
p {
    margin: 0 0 .25rem;
    font-weight: 600;
}
</style>