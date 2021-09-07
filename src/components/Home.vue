<script>
export default {
  data() {
    return {
      loading: false,
      endpoints: null,
      groups: null,
      modules: null,
      error: null,
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.error = this.endpoints = this.groups = null
      this.loading = true

      this.$http.get("http://localhost:3020/endpoints").then(res => {
        this.endpoints = res.data
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })

      this.$http.get("http://localhost:3020/groups").then(res => {
        this.groups = res.data
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })

      this.$http.get("http://localhost:3020/modules").then(res => {
        this.modules = res.data
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })



    },
  },
}
</script>

<template>
  <h1>Dashboard</h1>
  <hr>
  <div class="d-flex flex-row justify-content-evenly">
    <div class="card flex-grow-1">
      <div class="card-header">
        Modules ({{modules.length}})
      </div>
      <div class="list-group-flush">
        <div v-for="module in modules" class="list-group-item">
          <div>{{module.name}}<span class="text-muted"> @ 1.1</span></div>
          <div class="small text-muted">{{module.description}}</div>
        </div>
      </div>
    </div>
    <div class="card flex-grow-1">
      <div class="card-header">
        Endpoints
      </div>
      <div class="list-group-flush">
        <div v-for="endpoint in endpoints" class="list-group-item d-flex justify-content-between">

          <div>
            {{endpoint.name}}
            <div class="text-muted small">{{endpoint.groups.map(g => g.name).join(", ")}}</div>
          </div>
          <div class="text-primary">This terminal</div>
        </div>

      </div>
    </div>
    <div class="card flex-grow-1">
      <div class="card-header">
        Groups
      </div>
      <div class="list-group-flush">
        <div v-for="group in groups" class="list-group-item d-flex justify-content-between">
          <div>
            {{group.name}}
            <div class="text-muted small"></div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  column-gap: 1em !important;
}
</style>
