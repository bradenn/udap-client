<script>

export default {
  data() {
    return {
      uptime: ""
    }
  },
  watch: {
  },
  created() {

  },
  methods: {
    parseUptime(){
      let since = (new Date().getTime() - this.$root.connectedSince.getTime()) / 1000
      let minutes = Math.round(since/60)
      let hours = Math.round(minutes/60)
      let days = Math.round(hours/24)
      this.uptime = `${days}d ${hours}h ${minutes}m`
    }
  },
}
</script>

<template>
  <div class="d-flex justify-content-end">
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center element status-bar dropdown-toggle" role="button"
         id="dropdownMenuLink" data-bs-toggle="dropdown" v-on:click="parseUptime">
        <i class="bi indicator"
           v-bind:class="this.$root.connected ? 'text-success bi-circle-fill ' : this.$root.connecting ? 'text-warning bi-circle-fill ' : 'text-danger bi-circle-fill pulse'"></i>
      </a>

      <div class="dropdown-menu">
        <div class="dropdown-header">Connection</div>
        <div class="dropdown-item small"><span class="fw-menu-item">Status</span>{{this.$root.connected ? 'Connected' : this.$root.connecting ? 'Connecting' : 'Disconnected'}}</div>
        <div class="dropdown-item small"><span class="fw-menu-item">Host</span>{{ this.$host }}</div>
        <div class="dropdown-item small"><span class="fw-menu-item">Uptime</span>{{ uptime }}</div>
        <div class="dropdown-header">Metadata</div>

        <div  v-if="this.$root.metadata.endpoint">
          <div class="dropdown-item small"><span class="fw-menu-item">Name</span>{{ this.$root.metadata.endpoint.name }}</div>
        <div class="dropdown-item small"><span class="fw-menu-item">UUID</span><span class="short-string">{{ this.$root.endpointId }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.fw-menu-item{
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
  line-height: 1em;
  font-size: 12px;
  padding: 0.5em 0.5em;
}

.dropdown-toggle::after {
  border-radius: 8px;
  border-width: 5px;
  border-top-color: rgba(255, 255, 255, 0.16) !important;
}

.indicator {
  font-size: 1em;
  margin-right: calc(0.125em + 2px);
}
</style>
