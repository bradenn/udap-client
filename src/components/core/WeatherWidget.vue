<script>

export default {
  data() {
    return {}
  },
  created() {

  },
  methods: {},
}
</script>

<template>
  <div class="col-4">
    <div class="weather element">
      <div>
        <i class="bi bi-brightness-high-fill"></i>
        <span class="mx-2">78°</span>
      </div>
      <div>
        <i class="bi bi-arrow-right-short" style="font-size: 1.25em; line-height: inherit;"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather {
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  /*border-radius: 6px;*/
  padding: 0.125em 0.625em;
  align-items: center;
  font-size: 1.125em !important;
}
</style>
