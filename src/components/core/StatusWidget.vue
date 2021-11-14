<script>

export default {
  data() {
    return {
      uptime: "",
      modClock: 0,
      modDir: false,
    }
  },
  watch: {},
  created() {
    setInterval(this.tick, 250)
  },
  methods: {
    tick() {
      this.modClock += this.modDir ? 1 : -1;
      if (this.modClock >= 4) {
        this.modDir = false
      } else if (this.modClock <= 0) {
        this.modDir = true
      }
    },
  },
}
</script>

<template>
  <div class="d-flex justify-content-end">
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center status-bar element dropdown-toggle" role="button"
         id="dropdownMenuLink" data-bs-toggle="dropdown">
        <span
            class="flex-grow-1 fw-bold">Status: {{ this.$root.connection.connected ? 'OK' : 'Connection Lost' }}</span>
        <i class="bi "
           v-bind:class="this.$root.connection.connecting?`bi-reception-${this.modClock}`:this.$root.connection.connected?`bi-reception-4`:`bi-reception-0`"></i>
        <i class="bi bi-cloud-fill"></i>
        <!--        <i class="bi indicator"
                   v-bind:class="this.$root.connected ? 'text-success bi-circle-fill ' : this.$root.connecting ? 'text-warning bi-circle-fill ' : 'text-danger bi-circle-fill pulse'"></i>-->
      </a>

      <div class="dropdown-menu">
        <div class="dropdown-header">Connection</div>
        <div class="dropdown-item small"><span
            class="fw-menu-item">Status</span>{{ this.$root.connection.connected ? 'Connected' : this.$root.connection.connecting ? 'Connecting' : 'Disconnected' }}
        </div>
        <div class="dropdown-item small"><span class="fw-menu-item">Host</span>{{ this.$root.config.host }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.fw-menu-item {
  display: inline-block;
  width: 64px;
  font-weight: bold;
  color: var(--bs-gray-400);
}

.short-string {
  line-height: 11px;
  display: inline-block;
  width: 164px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.status-bar {

  /*background-color: rgba(var(--bs-primary-rgb), 0.5) !important;*/
  height: 3em;
  width: 24em;
  line-height: 1em;
  font-size: 12px;
  border-radius: 1em;

  padding: 0.5em 1em !important;
  justify-content: right;
  gap: 1em;
}

.dropdown-toggle:hover {
  color: inherit;
}

.dropdown-toggle::after {
  border-radius: 8px;
  border-width: 5px;
  border-top-color: rgba(255, 255, 255, 0.5) !important;
}

.indicator {
  font-size: 1em;
  margin-right: calc(0.125em + 2px);
}
</style>
