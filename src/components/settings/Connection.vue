<script>

export default {
  data() {
    return {}
  },
  created() {
    setInterval(this.updateStatistics, 1000)
  },
  methods: {
    updateStatistics() {

    }
  },
}
</script>

<template>
  <div class="element px-3 mb-3">
    <div class="mb-3">
      <h5 class="mb-0 mt-1">Connection Parameters</h5>
      <span class="text-muted small mt-0">Modify the existing configuration for this endpoint.</span>
    </div>
    <form>
      <div class="row">
        <div class="col-sm-4">
          <label for="hostAddress" class="col-form-label mb-0">Host Address</label>

        </div>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="this.$root.config.host" id="hostAddress">
          <div class="text-muted small mt-0">Changing this may interrupt this endpoint connection.</div>
        </div>
      </div>
    </form>
  </div>
  <div class="element px-3 mb-3">
    <div class="mb-3">
      <h5 class="mb-0 mt-1">Connection Status</h5>
      <span class="text-muted small mt-0">The endpoint's connection to the controller.</span>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4">
        <label for="hostAddress" class="">Connection State</label>
      </div>
      <div class="col-sm-8">
        <div v-bind:class="this.$root.connection.connected ? 'text-success' : this.$root.connection.connecting ? 'text-warning' : 'text-danger'">{{this.$root.connection.connected ? 'Connected' : this.$root.connection.connecting ? 'Connecting' : 'Disconnected'}}</div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4">
        <label for="hostAddress" class="">Enrolled</label>
      </div>
      <div class="col-sm-8">
        <div>{{this.$root.session.metadata !== null && this.$root.connection.connected ? "Yes" : "No"}}</div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4">
        <label for="hostAddress" class="">{{this.$root.connection.connected?"Uptime":"Downtime"}}</label>
      </div>
      <div class="col-sm-8">

      </div>
    </div>
  </div>
  <div class="element px-3" v-if="this.$root.metadata !== null">
    <div class="mb-3">
      <h5 class="mb-0 mt-1">Endpoint Information</h5>
      <span class="text-muted small mt-0">The metadata received from the controller</span>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4">
        <label for="hostAddress" class="">UUID</label>
      </div>
      <div class="col-sm-8">
        <div>{{this.$root.session.metadata.endpoint.id}}</div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4">
        <label for="hostAddress" class="">Name</label>
      </div>
      <div class="col-sm-8">
        <div>{{this.$root.session.metadata.endpoint.name}}</div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4">
        <label for="hostAddress" class="">Subscriptions</label>
      </div>
      <div class="col-sm-8">
        <div>{{this.$root.session.metadata.endpoint.instances.length}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
