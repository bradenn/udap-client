<script>
import Dock from "./Dock.vue";
import Media from "./Media.vue";

export default {
  components: {Dock, Media},
  data() {
    return {
      loading: false,
      endpoints: null,
      date: "",
      modules: null,
      instances: null,
      error: null,
      time: {},
    }
  },
  created() {

    this.connection = new WebSocket("wss://localhost:3020/echo")

    console.log(this.connection)

    this.connection.onmessage = function(event) {
      console.log(event);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

    // watch the params of the route to fetch the data again
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {

    updateTime() {
      this.date = Intl.DateTimeFormat(navigator.language, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format()
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).formatToParts(new Date())
    },
  },
}
</script>

<template>
  <div class="container terminal">
    <div class="row">
      <div class="col-4 mx-0">
        <div class="head">
          <div>
            <span class="clock">{{ time.map(a => (a.type !== "dayPeriod") ? a.value : "").join("") }}</span>
            <div class="text-muted">
              {{ this.date }}
            </div>
          </div>
        </div>


      </div>
      <div class="col-3 mx-0"></div>
      <div class="col-5 mx-0">
        <Media v-if="true"></Media>
      </div>
      <div class="row">

        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

      </div>
    </div>



    <div class="row">
      <div class="col-12">
        <Dock>
          <router-link class="icon" to="/terminal">
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

.terminal {
  height: calc(100% - 1.5em);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.clock {
  font-family: "Roboto", monospace !important;
  font-size: 5em;
  font-weight: 400;
  line-height: 1em;
}

.head {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5em;
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
