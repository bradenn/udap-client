<script>

import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      endpoints: null,
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
      this.error = this.post = null
      this.loading = true

      axios.get("http://localhost:3020/endpoints").then(res => {
        this.endpoints = res.data
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
  <h1>Endpoints</h1>
  <span v-if="loading">Loading...</span>
  <span v-if="error" class="text-danger">{{error}}</span>
  <div class="card" v-for="endpoint in endpoints">
    <a v-bind:href="'/endpoints/'+endpoint.id">{{endpoint.name}}</a>
    {{endpoint.id}}
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
