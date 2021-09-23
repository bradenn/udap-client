<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      endpoints: null,
      groups: null,
      modules: null,
      instances: null,
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
        {immediate: true}
    )
  },
  methods: {
    runFunction(id, name) {
      const config = {
        headers: {Authorization: `Bearer ${this.$JWT}`}
      }
      this.$http.get(`http://localhost:3020/instances/${id}/func/${name}`, config).then(res => {
        alert(JSON.stringify(res.data))
      }).catch(err => {
        this.error = err
        this.loading = false
      })
    },
    fetchData() {
      this.error = this.groups = null
      this.loading = true

      const config = {
        headers: {Authorization: `Bearer ${this.$JWT}`}
      }

      this.$http.get("http://localhost:3020/modules", config).then(res => {
        this.modules = res.data
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })

      this.$http.get("http://localhost:3020/instances", config).then(res => {
        this.instances = res.data
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
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else>
      <div class="row">
        <div class="col-4">
          <div class="element">
            <div class="d-flex justify-content-between align-content-center mt-1">
              <h6 class="mx-1">Modules</h6>
              <div class="bg-blur">Load</div>

            </div>
            <div class="divider"></div>
            <div class="list-group-flush">
              <div v-for="module in modules" class="list-group-item d-flex justify-content-between">

                <div>
                  {{ module.name }}
                  <div class="text-muted small">{{ module.description }}</div>
                </div>

                <div class="text-muted">v{{ module.version }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="element">
            <div class="list-group-flush">
              <div v-for="instance in instances" class="list-group-item d-flex justify-content-between">

                <div>
                  <div>{{ instance.name }}</div>
                  <div class="text-muted small">{{ instance.description }}</div>
                  <ul class="list-group">
                    <li v-for="func in instance.module.functions" class="list-group-item">
                      <a v-on:click="runFunction(instance.id, func)" href="#">{{ func }}</a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
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
