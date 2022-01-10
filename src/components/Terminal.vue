<script>
import Dock from "./Dock.vue";
import StatusWidget from "./Hub.vue";
import Clock from "./Clock.vue";
import Group from "./Group.vue";

export default {
  components: {Group, Dock, StatusWidget, Clock},
  data() {
    return {
      pages: ["/terminal/home", "/terminal/apps", "/terminal/shell", "/terminal/settings"],
      page: 0,
      headerScale: "lg",
      transitionName: 'slide-left',
      isDragging: false,
      context: false,
      verified: false,
      dragA: {x: 0, y: 0}
    }
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.meta.slideOrder
    const fromDepth = from.meta.slideOrder
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  watch: {},
  created() {
  },
  methods: {
    showContext() {
      this.context = true
    },
    timeout() {
      if (this.isDragging) {
        this.verified = true

      }
    },
    dragContinue(e) {

    },
    goRight() {
      if (this.page + 1 <= 4) {
        this.page++;
        /*   this.$router.replace(this.pages[this.page])*/
      }
    },
    goLeft() {
      if (this.page - 1 >= 0) {
        this.page--;
        /*      this.$router.replace(this.pages[this.page])*/
      }
    },
    dragStart(e) {
      this.isDragging = true;
      let a = {x: e.clientX, y: e.clientY}
      if (a.y < 64) {
        /*  this.context = !this.context*/
      }
      this.dragA = a
      setTimeout(this.timeout, 300)
    },
    dragStop(e) {
      this.isDragging = false;
      if (this.verified) {
        let dragB = {x: e.clientX, y: e.clientY}
        if (dragB.x > this.dragA.x) {
          this.goLeft()
        } else {
          this.goRight()
        }
      }
      this.dragA = {x: 0, y: 0}
    }
  },
}
</script>

<template>

  <div class="terminal" v-on:mousedown="dragStart" v-on:mousemove="dragContinue" v-on:mouseup="dragStop">

    <div class="generic-container">

      <div class="generic-slot-sm">
        <Clock></Clock>
      </div>

      <div class="generic-slot-sm">
        <StatusWidget></StatusWidget>
      </div>

    </div>
    <div class="h-100">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" class="child-view"/>
        </transition>
      </router-view>
    </div>

  </div>

</template>

<style lang="scss">

.terminal {
  padding: 1em;
  height: 100vh !important;
  overflow: no-display;
}

.bar {
  position: relative;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 0;

  border-radius: 0;
}

.sf {
  font-family: 'SF Pro Display', sans-serif;
  font-weight: 400 !important;
}

.profile {

  aspect-ratio: 3/1;
}

.endpoint {
  font-size: 1.2em;
  padding: 0.25em 1.2em;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .125s cubic-bezier(0.5, 0.8, 0.5, 0.2);
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.child-view .element {
  max-height: calc(100vh - 128px) !important;
  transition: all .25s ease-out;
}

.dock {
  transition: all .25s ease-out;
}

.slide-left-enter, .slide-right-enter {
  animation: blur-in 300ms linear forwards;
}

.slide-right-leave-active > *, .slide-left-leave-active > * {
  animation: blur-out 300ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  position: relative;
  top: 0;
}

@keyframes blur-out {
  0% {
    filter: blur(0px);
    opacity: 1;
  }
  100% {
    opacity: 0;
    filter: blur(8px);
    /*transform: scaleZ(1);*/
  }
}

@keyframes blur-in {
  0% {
    filter: blur(8px);
    opacity: 0 !important;
  }
  100% {
    filter: blur(0px);
    opacity: 1 !important;
  }
}

.slide-left.router-link-active.icon {
  /*animation: slide-in-left 500ms cubic-bezier(0,1.21,.39,.96);*/
}

.slide-right.router-link-active.icon {
  /*animation: slide-in-right 500ms cubic-bezier(0,1.21,.39,.96);*/
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
  height: 3.5em !important;
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
