<template>
  <div class="LoaderCard l-col la-c-c" :style="customStyles">
    <div class="LoaderCard__wrapper">
      <div class="LoaderCard__loader" v-for="index in 12" :key="index" />
    </div>
    <p class="LoaderCard__desc" :style="customDescStyle" v-html="label"></p>
  </div>
</template>

<script>
export default {
  name: "CircularLoader",
  props: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    label: {
      type: String,
      default: "Loading..."
    },
    fontSize: {
      type: Number,
      default: 32
    }
  },
  computed: {
    customStyles() {
      return {
        width: this.width ? this.width : "auto",
        height: this.height ? this.height : "auto"
      };
    },
    customDescStyle() {
      return {
        fontSize: `${this.fontSize}px`
      };
    }
  }
};
</script>

<style lang="scss">
.LoaderCard {
  background: white;
  border-radius: 5px;
  &__wrapper {
    position: relative;
  }
  &__loader {
    left: 50%;
    top: 30%;
    position: absolute;
    -webkit-animation: loader linear 1s infinite;
    animation: loader linear 1s infinite;
    background: #aaaaaa;
    width: 4px;
    height: 11px;
    border-radius: 26%;
    -webkit-transform-origin: 2px 20px;
    transform-origin: 2px 20px;
    @for $i from 0 through 11 {
      &:nth-child(#{$i + 1}) {
        -webkit-transform: rotate(#{$i * 30}deg);
        transform: rotate(#{$i * 30}deg);
        -webkit-animation-delay: #{($i - 11) / 12}s;
        animation-delay: #{($i - 11) / 12}s;
      }
    }
  }

  @keyframes loader {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @-webkit-keyframes loader {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  &__desc {
    position: relative;
    top: 50px;
    margin-top: 60px;
    font-size: 32px;
    font-weight: 300;
    color: #101010;
    text-align: center;
  }
}
</style>
