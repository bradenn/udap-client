<script>
import Dock from "./partials/Dock.vue";
import Media from "./modules/Media.vue";
import StatusWidget from "./core/StatusWidget.vue";
import Clock from "./core/Clock.vue";

export default {
  components: {Dock, Media, StatusWidget, Clock},
  data() {
    return {
      headerScale: "lg",
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = to.meta.slideOrder
    const fromDepth = from.meta.slideOrder
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  watch: {
    '$route'(to, from) {
      this.updateScale()
    }
  },
  created() {
    this.updateScale()
  },
  methods: {
    updateScale() {
      this.headerScale = this.$route.name !== "Home" ? "sm" : "lg"

    },
  },
}
</script>

<template>
  <div class="container-fluid terminal px-4">
    <div class="d-flex justify-content-between align-content-center">
        <div class="head">

          <div class="" style="z-index: 10;">
            <Clock v-bind:size="headerScale"></Clock>

          </div>
        </div>

      <div>
        <StatusWidget></StatusWidget>
      </div>
    </div>

    <div class="h-100">
      <div class="row">
        <div class="col-12">

          <router-view v-slot="{ Component }">
            <transition :name="transitionName" mode="out-in">
              <component class="child-view" :is="Component"/>
            </transition>
          </router-view>

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <Dock>
          <router-link class="icon" :class="`${this.transitionName}`" to="/terminal/home">
            <i class="bi bi-house"></i>
          </router-link>
          <router-link class="icon" :class="`${this.transitionName}`" to="/terminal/camera">
            <i class="bi bi-camera-video"></i>
          </router-link>
          <router-link class="icon" :class="`${this.transitionName}`" to="/terminal/apps">
            <i class="bi bi-grid-3x3-gap"></i>
          </router-link>

          <router-link class="icon" :class="`${this.transitionName}`" to="/terminal/security">
            <i class="bi bi-shield"></i>
          </router-link>
          <router-link class="icon" :class="`${this.transitionName}`" to="/terminal/settings">
            <i class="bi bi-gear"></i>
          </router-link>
        </Dock>

      </div>
    </div>


  </div>

</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .125s cubic-bezier(0.5, 0.8, 0.5, 0.2);
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.child-view {
  transition: all .25s ease-out;
}
.dock {
  transition: all .25s ease-out;
}

.slide-left-enter, .slide-right-leave-active {

  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {

  transform: translate(-100%, 0);
}

.slide-left.router-link-active.icon {
  animation: slide-in-left 500ms cubic-bezier(0,1.21,.39,.96);
}

.slide-right.router-link-active.icon {
  animation: slide-in-right 500ms cubic-bezier(0,1.21,.39,.96);
}

@keyframes slide-in-right {
  0% {
    transform: translate(2em, 0);
  }
  100% {
    transform: translate(0, 0em);
  }
}

@keyframes slide-in-left {
  0% {
    transform: translate(-2em, 0);
  }
  100% {
    transform: translate(0, 0em);
  }
}

.hidden {
  position: relative;
  animation: hide 0.5s 1;
  animation-fill-mode: forwards;
}

.terminal {
  height: calc(100% - 1.5em);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}


.head {
  display: flex;
  height: 2.5em !important;
  align-items: baseline;
  margin-bottom: 1em;
  justify-content: start;
}

.devices > .device {
  width: calc(100% / 3);
  aspect-ratio: 4/1;
  border-radius: 12px;
  display: flex;
  padding: 1em 1em;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  font-size: 16px;
  /*border: 1px solid rgba(255, 255, 255, 0.16);*/
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
}

.devices {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 76px;
  padding: 0.5em 0.5em;
  border-radius: 16px;
  opacity: 1;
  gap: 0.5em;
}

.header {
  font-family: Oswald, serif;
  font-weight: normal;
  font-size: 96px;
  line-height: 78px;
}


</style>
