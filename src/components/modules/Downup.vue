<script>

export default {
  data() {
    return {}
  },
  props: {
    name: String,
    data: Object
  },
  created() {

  },
  methods: {},
}
</script>

<template>
  <div class="mb-2 widget-sm element d-flex justify-content-between flex-column">
    <div class="d-flex justify-content-start">
      <div>
        <i class="bi indicator " v-bind:class="data.status === '200 OK' ? 'text-success bi-check-lg ' : 'text-danger bi-circle-fill'"></i>
      </div>
      <div>
        <span class="">{{ name }}</span>
      </div>
    </div>

    <span class="text-muted small">{{ data.status }}</span>
  </div>
</template>

<style scoped>

.indicator {
  margin-top: 0.5em;
  font-size: 1em;
  line-height: 1em;
  margin-right: 0.5em;

}
</style>
