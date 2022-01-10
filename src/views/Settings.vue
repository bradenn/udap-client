<script>
import Sidebar from "../components/Sidebar.vue";
import Dock from "../components/Dock.vue";
import Context from "../components/Context.vue";


export default {
  components: {Context, Sidebar, Dock},
  data() {
    return {
      header: {
        icon: "􀌆",
        name: "Settings"
      }
    }
  },
  created() {
  },
  methods: {},
}
</script>

<template>
  <div class="h-100">
    <div class="context"></div>
    <div class="h-bar justify-content-center ">
      <div class="top w-25 float-end">
        <div class="h-bar justify-content-center">
          <div>
            <Header :target="header"></Header>
            <div class="v-bar gap" style="width: 12rem">
              <router-link v-for="page in this.$route.matched[1].children.filter(c => !c.hidden)"
                           class="dock-link px-3 py-2 justify-content-start"
                           draggable="false" v-bind:to="page.path">
                <div style="width: 1.2rem; padding-right: 1.5rem;">{{ page.sf }}&nbsp;</div>
                {{ page.name }}
              </router-link>
            </div>
          </div>
        </div>

      </div>
      <div class="top w-75 ">
        <router-view class="h-100 top float-start"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
