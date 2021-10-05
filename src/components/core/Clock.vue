<script>

export default {
  data() {
    return {
      time: null,
      timer: null
    }
  },
  props: {
    size: String
  },
  created() {
    this.startClock()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    startClock() {
      this.updateTime()
      setTimeout(() => {
        this.timer = setInterval(this.updateTime, 1000)
      }, 1000 - new Date().getMilliseconds())
    },
    updateTime() {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).formatToParts(new Date())
    }
  },
}
</script>

<template>
  <div class="clock" v-bind:class="`clock-${size}`">
    {{ time.map(a => (a.type !== "dayPeriod") ? a.value : "").join("") }}
  </div>
</template>

<style scoped>
.clock-sm {
  font-size: 2em !important;
}

.clock {
  font-family: "Roboto", monospace !important;
  font-size: 3em;
  font-weight: 500;
  line-height: 1em;
  text-shadow: 1px 1px 12px rgba(0, 0, 0, 0.25);
  transition: font-size 0.25s ease-in-out;
}
</style>
