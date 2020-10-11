<template>
  <div id="app">
    <WeatherCard></WeatherCard>
  </div>
</template>

<script>
import "../src/assets/sass/main.scss";
import WeatherCard from "./components/WeatherCard";
export default {
  name: "app",
  data() {
    return {
      msg: "Weather app"
    };
  },
  components: {
    WeatherCard
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 768px;
  height: 975px;
}

body {
  font-family: Roboto, sans-serif;
  box-sizing: border-box;
  color: #000101;
  padding: 1rem;
  max-width: 800px;
  margin: auto;
}

input {
  font-size: 100%;
  line-height: 1.15;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.bold {
  font-weight: 700;
}

.text-lighter {
  color: #919393;
}

@media only screen and (min-width: 320px) and (max-width: 767px) {
  #app {
    width: 100%;
  }
}
</style>
