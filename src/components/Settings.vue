<script>
import Dock from "./Dock.vue";

export default {
  components: {Dock},
  data() {
    return {

    }
  },
  created() {
    console.log()
  },
  methods: {

  },
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12">
        <Dock small class="mb-3">

          <router-link v-for="page in this.$route.matched[1].children" class="text" v-bind:to="page.path">
            {{page.name}}
          </router-link>
        </Dock>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
