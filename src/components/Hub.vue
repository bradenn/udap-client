<script>
import Dock from "./Dock.vue";
import App from "./App.vue";
import Loading from "./Loading.vue";

export default {
  components: {Loading, Dock, App},
  data() {
    return {
      uptime: "",
      modClock: 1,
      modDir: false,
      open: false,
      reloading: false,
      focus: "idle",
      progress: 0,
      rotation: 0,
    }
  },
  watch: {},
  created() {
    setInterval(this.tick, 100)
  },
  methods: {
    update() {
      this.recalculateFocus()
      let n = Math.round(((new Date() - new Date(this.$root.state.last)) / 3000) * 100)
      if (n >= 120) {
        this.focus = "lapse"
      } else if (Math.abs(n - this.progress) >= 25) {
        this.focus = "active"
        setTimeout(() => {
          this.focus = "idle"
        }, 512)
        this.progress = n
      } else {

        this.progress = n
      }

    },
    poll() {
      this.$root.requestId("endpoint", "metadata", this.$root.session.metadata.endpoint.id, {});
    },
    hardReload() {
      this.$root.state.waiting = true
      window.location.reload()
    },
    recalculateFocus() {
    /*  this.focus = `transform: scale(calc(0.50 + ${this.$root.state.accepting ? '0.50' : (Math.random() * 0.125)})) perspective(2rem);`*/
    },
    tick() {
      this.update()
      this.modClock += this.modDir ? 1 : -1;
      if (this.modClock >= 4) {
        this.modDir = false
      } else if (this.modClock <= 1) {
        this.modDir = true
      }
    },
  },
}


</script>


<template>
  <div class="top mb-2">
    <Dock class="top">
      <div class="d-flex flex-column justify-content-center align-items-center h-100 label-o4"
           style="margin-left: 0.25rem;">

        <span v-if="this.$root.connection.connected" class="icon-sm my-1">􀙇</span>
        <span v-else class="icon-sm my-1">􀙥</span>

        <span v-if="this.$root.connection.connected" class="icon-sm my-1">􀢔</span>
        <span v-else class="icon-sm my-1">􀌐</span>

      </div>
      <div class="mx-2"
           style="border-right: 1px solid rgba(255, 255, 255, 0.06); width: 1px; height:32px; border-radius: 1px;"></div>
      <router-link class="dock-icon" draggable="false" to="/terminal/home">
        􀎞
      </router-link>
      <router-link class="dock-icon" draggable="false" to="/terminal/settings/endpoint">
        􀍟
      </router-link>
      <div class="mx-1"
           style="border-right: 1px solid rgba(255, 255, 255, 0.06); width: 1px; height:32px; border-radius: 1px;">
      </div>

      <div class="dock-icon" draggable="false" @click="hardReload">
        <Loading v-if="this.$root.state.waiting" medium></Loading>
        <div v-else class="label-o1">􀅉</div>
      </div>

    </Dock>
    <div class="mt-1">
      <div class="element d-flex align-items-center">
        <div class="focus-container">
          <div class="focus-inner label-o2" :class="`focus-${this.focus}`">􀝝</div>
          <div  class="focus-outer label-o2" :class="`${this.focus==='lapse'||!this.$root.connection.connected?'focus-warn':'focus-success'}`">􀝝</div>
        </div>
        <div class="w-100 mx-2 ">
          <div class="label-xxs label-w600 label-o5 ">{{this.$root.connection.connected?'Connected':'Disconnected'}}</div>
          <div class="label-ys label-w500 label-o4 lh-1">wss://{{ this.$root.config.host }}:{{
              this.$root.config.port
            }}
          </div>
        </div>
      </div>

    </div>
  </div>


</template>

<style lang="scss" scoped>


</style>
