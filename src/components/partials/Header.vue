<script setup>
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">


      <a class="navbar-brand" href="#">UDAP</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" v-for="route in this.$router.getRoutes().sort((a, b) => a.name < b.name)"
             v-bind:href="route.path">{{ route.name }}</a>
        </div>
        <div class="navbar-nav">
          <select class="form-select" id="floatingSelect">
            <option selected>Diagnostic</option>
            <option value="1">Control Panel</option>
            <option value="2">Custom</option>
          </select>

        </div>

      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
