<template>
  <section class="SearchBar_searchListContainer">
    <div class="SearchList_searchListItem" v-for="(city,idx) in cities" :key="idx" @click="selectCity(city)">
      <span>{{city.name}}</span>
      <div class="weatherMeta">
        <div class="temperature">
          <span>32° C</span>
          <span class="text-lighter">Smoke</span>
        </div>
        <img
          class="SearchList_weatherIcon"
          src="../../assets/icons/sunny.svg"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    cities: {
			type: Array,
      default: ["Mumbai"],
      required: true
		}
  },
  methods: {
    selectCity(city){
      console.log("selected", city.name)
      this.$emit("handleCityChange", city);
    }
  }
};
</script>

<style scoped>
.SearchBar_searchListContainer {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px -3px;
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  z-index: 10;
}
.SearchList_searchListItem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  animation: SearchList_slideIn__2c_J- 0.5s;
}
.SearchList_weatherIcon {
  height: 40px;
  width: 40px;
  margin-left: 0.5rem;
}
.weatherMeta{
  display: flex;
  justify-content: space-between;
}
.temperature {
  display: flex;
  flex-direction: column;
}

</style>
