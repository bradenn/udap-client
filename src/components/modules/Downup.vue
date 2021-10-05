<script>

export default {
  data() {
    return {}
  },
  props: {
    data: Object
  },
  created() {

  },
  methods: {},
}
</script>

<template>
  <div class="element px-2 d-inline-block">
    <div class="mx-2">
      <div class="d-flex align-items-center">
        <i class="bi indicator "
           v-bind:class="data.status === '200 OK' ? 'text-success bi-circle-fill ' : 'text-danger bi-circle-fill'"></i>

        <span>{{ data.url.replace("https://", "") }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.indicator {
  font-size: 0.55em;
  margin-right: 1em;
}
</style>
