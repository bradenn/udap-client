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
  watch: {
  },
  created() {
    setInterval(this.tick, 100)
  },
  methods: {
    update() {
      this.recalculateFocus()
      if (this.$root.state.waiting) {
        this.focus = "wait"
        return
      }
      let n = Math.round(((new Date() - new Date(this.$root.state.last)) / 2000) * 100)
      if (n >= 150) {
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
    state() {
      if(this.focus==='lapse' || !this.$root.connection.connected) {
        return 'focus-animate-lapse'
      }else if (this.$root.state.waiting) {
        return 'focus-animate-active'
      }else{
        return 'focus-animate-idle'
      }
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
    <div class="element d-flex justify-content-center" style="width: 3rem;">
      <div class="focus-container px-1 " @click="hardReload">
        <div class="focus-inner label-o2" :class="`focus-animate-${this.focus}`">􀝝</div>
        <div  class="focus-outer label-o4">􀝝</div>
      </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>


</style>
