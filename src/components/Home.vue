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
  watch: {
    '$root.instances'(data) {
      if (data != null) this.updateInstances(data)
    }
  },
  created() {
    this.updateInstances(this.$root.instances)
  },
  beforeDestroy() {

  },
  methods: {
    updateInstances(data) {
      this.instances = Object.values(data).map(a => {
        console.log(a)
        return JSON.parse(a)
      })
      this.instances.sort((a, b) => a.type > b.type ? -1 : 1)

    }
  },
}
</script>

<template>
  <div>
    <!--    <WeatherWidget v-bind:class="this.$route.name === 'Settings'?'hidden':''"></WeatherWidget>-->
    <div class="home">
      <div v-for="instance in this.instances" class="">
        <Downup v-if="instance.type === 'downup'"
                v-bind:name="instance.name"
                v-bind:data="JSON.parse(instance.data)" class="col-4"></Downup>
        <div class="element my-2 px-3" v-if="instance.type === 'homebridge'">
          {{instance.data !== ""?JSON.parse(instance.data):"Nothing m8"}}
        </div>

        <Media v-if="instance.type === 'spotify'" v-bind:meta="instance"
               v-bind:media="instance.data!==''?JSON.parse(instance.data):{error: true}" class="col-6"></Media>
      </div>
      <div class="element toggle d-flex flex-column justify-content-between">
        <div class="d-flex">
          <i class="bi bi-lamp-fill toggle-icon"></i>
          <div class="toggle-title">Bedroom Lamp</div>
        </div>
        <div class="d-flex justify-content-between align-items-baseline">
          <div class="toggle-status">Off</div>
          <div class="toggle-meta">560mW</div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>

.toggle-icon {
  color: var(--bs-gray-400);
  opacity: 0.75;
}

.toggle-title {
  font-weight: 700;
  margin-left: 0.5em;
  opacity: 0.75;
}

.toggle-status {
  font-weight: 500;
  opacity: 0.5;
}

.toggle-meta {
  color: var(--bs-gray-400);
  font-weight: 400;
  font-size: 12px;
  opacity: 0.75;
}


.toggle {
  width: 25%;
  aspect-ratio: 2.5/1.4142135624;
  padding: 0.75em 1em !important;
}

.home {
  width: 100%;

  align-items: center;
  margin-top: 1em;
  gap: 0.5em;
}

.card {
  margin-top: 1em;
  column-gap: 0.5em !important;
}
</style>
