<script>
import Dock from "./Dock.vue";
import Media from "./Media.vue";

export default {
  components: {Dock, Media},
  data() {
    return {
      connected: false,
      connecting: false,
      instances: null,
      date: "",
      time: {},
    }
  },
  created() {
    this.connect()
    // watch the params of the route to fetch the data again
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    this.connection.close()
    clearInterval(this.timer)
  },
  methods: {
    connect() {
      this.connecting = true
      this.connection = new WebSocket("ws://localhost:3020/ws")
      this.connection.onmessage = this.onMessage
      this.connection.onopen = this.onConnect
      this.connection.onclose = this.onClose
    },
    onMessage(event) {
      this.instances = JSON.parse(event.data)
    },
    onConnect(event) {
      this.enroll()
      this.connecting = false
      this.connected = true
    },
    onClose(event) {
      this.connected = false
      setTimeout(this.connect, 1000)
    },
    enroll() {
      this.connection.send(JSON.stringify({
            token: this.$JWT,
            type: "enroll",
            payload: {
              instances: ["f43e4cff-ee93-4265-9fc8-018318ae0b50"]
            }
          }
      ));
    },
    updateTime() {
      if (this.rcTime > 0 && !this.connected) {
        this.rcTime -= 1;
        this.reconnectStatus = "Failed, trying again in " + this.rcTime
      }
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
      <div class="col-4">
        <div class="head">
          <div>
            <span class="clock">{{ time.map(a => (a.type !== "dayPeriod") ? a.value : "").join("") }}</span>
            <div class="text-muted">
              {{ this.date }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-3"></div>

      <div class="col-5">
        <div class="d-flex justify-content-end">
          <div class="d-flex align-items-center element status-bar">
            <i class="bi indicator"
                 v-bind:class="this.connected ? 'text-success bi-circle-fill ' : this.connecting ? 'text-warning bi-circle-fill ' : 'text-danger bi-circle-fill'"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="h-100">
      <div class="row" v-if="connected">
        <div class="col-12">
          <div class="element"></div>
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

.mini {
  font-size: 12px;
  line-height: 1em;
}

.status-bar {
  height: 10px;
  width: 18px;
  padding: 0.5em 4px;
}

.indicator {
  font-size: 8px;
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
