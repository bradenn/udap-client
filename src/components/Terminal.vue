<script>
import Dock from "./Dock.vue";
import Media from "./Media.vue";
import StatusWidget from "./StatusWidget.vue";
import Clock from "./core/Clock.vue";

export default {
  components: {Dock, Media, StatusWidget, Clock},
  data() {
    return {
      headerScale: "lg",
    }
  },
  watch: {
    '$route'(to, from) {
      this.updateScale()
    }
  },
  created() {
    this.updateScale()
  },
  methods: {
    updateScale() {
      this.headerScale = this.$route.name !== "Home" ? "sm" : "lg"
    },
  },
}
</script>

<template>
  <div class="container terminal">

    <div class="row">
      <div class="col-4">
        <div class="head">
          <div>
            <Clock v-bind:size="headerScale"></Clock>
          </div>
        </div>
      </div>

      <div class="col-3"></div>

      <div class="col-5">
        <StatusWidget></StatusWidget>

      </div>
    </div>
    <div class="h-100">
      <div class="row">
        <div class="col-12">

          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component"/>
            </transition>
          </router-view>

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <Dock>
          <router-link class="icon" to="/terminal/home">
            <i class="bi bi-lightbulb-fill"></i>
          </router-link>
          <router-link class="icon" to="/terminal/tools">
            <i class="bi bi-calculator-fill"></i>
          </router-link>
          <div class="icon">
            <i class="bi bi-shield-shaded"></i>
          </div>
          <div class="icon">
            <i class="bi bi-lightning-charge-fill"></i>
          </div>
          <router-link class="icon" to="/terminal/settings">
            <i class="bi bi-gear-fill"></i>
          </router-link>
        </Dock>
      </div>
    </div>


  </div>

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.125s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hidden {
  position: relative;
  animation: hide 0.5s 1;
  animation-fill-mode: forwards;
}

.terminal {
  height: calc(100% - 1.5em);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.head {
  display: flex;
  align-items: baseline;
  margin-bottom: 1em;
  justify-content: start;
}

.devices > .device {
  width: calc(100% / 3);
  aspect-ratio: 4/1;
  border-radius: 12px;
  display: flex;
  padding: 1em 1em;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  font-size: 16px;
  /*border: 1px solid rgba(255, 255, 255, 0.16);*/
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
}

.devices {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 76px;
  padding: 0.5em 0.5em;
  border-radius: 16px;
  opacity: 1;
  gap: 0.5em;
}

.header {
  font-family: Oswald, serif;
  font-weight: normal;
  font-size: 96px;
  line-height: 78px;
}
</style>
