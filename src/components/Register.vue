<script>
export default {
  data() {
    return {
      key: "",
      error: "",
    }
  },
  created() {
    if(this.$sessionId !== 'undefined') this.$router.push("/terminal")
  },
  methods: {
    register(key) {
      this.$http.get(this.$host + "/endpoints/register/" + key)
          .then(this.success).catch(this.rejected)
    },
    success(result) {
      this.$setSessionId(result.data.token)
      this.$router.push("/terminal")
    },
    rejected(result) {
      this.error = result
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-around mt-5">
        <div class="element px-3">
          <h5 class="my-1">Register Endpoint</h5>
          <div class="small text-danger" v-if="error">{{ error }}</div>
          <form class=" pt-2 pb-2">

            <div class="input-group">
              <input type="text" class="form-control" v-model="key" placeholder="- - - - - - - -"/>
              <div class="btn btn-fog text-muted" v-on:click="register(key)">
                <i class="bi bi-arrow-right fw-bolder"></i>
              </div>
            </div>
            <div class="form-text">Endpoint keys can be generated from a diagnostic terminal.</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
