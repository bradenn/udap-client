<script>

import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      endpoint: null,
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
    fetchData() {
      this.error = this.post = null
      this.loading = true

      axios.get("http://localhost:3020/endpoints/" + this.$route.params.id).then(res => {
        this.endpoint = res.data
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
  <div v-if="loading">
    <h1>Endpoint</h1>
    <span>Loading...</span>
  </div>
  <div v-else>
    <h1>{{ endpoint.name }}</h1>

    <div v-for="group in endpoint.groups">
      <div v-for="entity in group.entities">

        <h3>{{ entity.name }}</h3>

        <div v-for="func in entity.functions">
          <a v-bind:href="'/function/'+func.id">
            <div class="card card-button">
              <h6>{{ func.name }}</h6>
              <span class="text-muted small">Get the local time</span>
            </div>
          </a>

        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: inherit;
  text-decoration: none;
}

.card-button:hover {
  border-color: var(--bs-primary);
  box-shadow: var(--bs-primary) inset 0 0 2px 1px;
}

.card-button {
  height: 6em;
  width: 16em;
  padding: 0.75em 1em;
  border-radius: 12px;
  transition: box-shadow, border-color 100ms ease-in-out;
}

.card-button > h6 {
  margin-bottom: 0em;
}
</style>
