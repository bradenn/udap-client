<script>
export default {
  components: {

  },
  data() {
    return {
      grid: null
    }
  },
  created() {

  },
  methods: {},
}


</script>

<template>

  <div class="element px-3">
    <h5 class="mb-2">Unallocated Instances</h5>

    <div v-if="this.$root.metadata !== null" class="mb-2">
      <div class="element px-3 col-4" v-for="instance in this.$root.metadata.endpoint.instances">
        <h6 class="mb-0">{{ instance.module.name }}</h6>
        <div class="text-muted">{{ instance.name }}</div>
        <div class="text-muted">{{ instance.description }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
