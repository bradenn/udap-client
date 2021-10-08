<script>
import WeatherWidget from "./core/WeatherWidget.vue";
import Downup from "./modules/Downup.vue";
import Media from "./modules/Media.vue";

export default {
  components: {WeatherWidget, Downup, Media},
  data() {
    return {
      instances: {}
    }
  },
  created() {

  },
  beforeDestroy() {
  },
  methods: {},
}
</script>

<template>
  <div>
    <WeatherWidget v-bind:class="this.$route.name === 'Settings'?'hidden':''"></WeatherWidget>
    <div class="row mt-2">
      <div v-for="(v, k) in this.$root.instances" class="mb-3">
        <Media v-if="k === 'd9f696ca-d94a-47bb-b6fc-e2b1b81e319e'"
               v-bind:media="v!==''?JSON.parse(v):{error: true}"
               v-bind:class="this.$route.name === 'Settings'?'hidden':''"></Media>
        <Downup v-if="k === 'f43e4cff-ee93-4265-9fc8-018318ae0b50'" v-bind:data="JSON.parse(v)"
                v-bind:class="this.$route.name === 'Settings'?'hidden':''"></Downup>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card {
  column-gap: 1em !important;
}
</style>
