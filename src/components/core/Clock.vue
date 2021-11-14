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
        hour12: true,
      }).formatToParts(new Date())
    }
  },
}
</script>

<template>
  <div class="clock" v-bind:class="`clock-${size}`" v-html="
      time.map(a => {
        return (a.type !== 'dayPeriod') ? a.value : ``
  }).join('')">


  </div>
</template>

<style scoped>
.clock-sm {
  font-size: 2.5em !important;
}

.clock {
  font-size: 3.5em;
  font-weight: 600;
  line-height: 1em;
  text-shadow: 1px 1px 12px rgba(0, 0, 0, 0.25);
  transition: font-size 0.25s ease-in-out;
}
</style>
