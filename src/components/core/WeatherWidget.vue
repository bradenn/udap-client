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
  <div class="weather element">
    <div class="d-flex justify-content-start align-items-center align-content-center">
      <div>
        <i class="bi bi-brightness-high-fill"></i>
        <span class="mx-2">78°</span>
      </div>
      <div class="bar mx-2"></div>
      <div>
        <i class="bi bi-brightness-high-fill px-2"></i>
        <i class="bi bi-brightness-high-fill px-2"></i>
        <i class="bi bi-brightness-high-fill px-2"></i>

      </div>

    </div>
    <div>
      <i class="bi bi-arrow-right-short" style="font-size: 1.25em; line-height: inherit;"></i>
    </div>
  </div>
</template>

<style scoped>
.bar {
  height: 1.2em;

  width: 2px;
  border-radius: 4px;
  background-color: var(--bs-fog);
}

.weather {
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  padding: 0.125em 0.625em;
  align-items: center;
  height: 2.5em;
  font-size: 1.125em !important;
}
</style>
