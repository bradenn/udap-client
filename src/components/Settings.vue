<script>
import Sidebar from "./partials/Sidebar.vue";
import Dock from "./partials/Dock.vue";

export default {
  components: {Sidebar, Dock},
  data() {
    return {}
  },
  created() {
  },
  methods: {},
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12 d-lg-none">
        <Dock class="mb-3 " small>
          <router-link v-for="page in this.$route.matched[1].children" class="text" v-bind:to="page.path">
            {{ page.name }}
          </router-link>
        </Dock>
      </div>
    </div>
    <div class="row">
      <div class="col-3 d-none d-lg-block d-xl-block">
        <Sidebar class="mb-3 ">
          <div class="d-flex flex-row justify-content-between">

            <div class="flex-grow-1">
              <div class="m-2 mt-0">
                <h5 class="mt-1 mb-0">Settings</h5>
                <span class="text-muted small mt-0">Modify endpoint configuration</span>
              </div>
              <router-link v-for="page in this.$route.matched[1].children"
                           class="menu-item"
                           v-bind:to="page.path">
                <div><i class="menu-icon bi" v-bind:class="page.icon"></i>
                  {{ page.name }}
                </div>
                <div>
                  <i class="bi bi-layout-sidebar-inset-reverse float-end text-muted"></i>
                </div>
              </router-link>
            </div>

          </div>
        </Sidebar>
      </div>
      <div class="col-12 col-lg-9">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<style scoped>
.class-con {
  position: relative;
  top: 0;
  right: 0;
  padding: 0 0em;
  font-size: 1.4em;
  color: rgba(255, 255, 255, 0.4);

}
</style>
