<script>

export default {
  data() {
    return {

    }
  },
  props: {
    multiline: Boolean,
    small: Boolean
  }
}

</script>

<template>
  <div class="dock element" v-bind:class="multiline?'multiline':small?'sm':''">
    <slot></slot>
  </div>
</template>

<style>
.icon > .bi {
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
}


.multiline > .icon {
  flex: 1 1 auto;
  font-size: 16px;
  padding: 0.25em 0.5em;
}

.sm > .icon {
  padding: 0.125em 0.25em;
}

.sm {
  height: 42px !important;
}

.text.router-link-exact-active {
  background-color: var(--bs-primary);
  color: var(--bs-gray-100);
}

.text {
  min-height: 32px;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  line-height: 1em;
  font-weight: 400;
  font-size: 16px;
  color: var(--bs-gray-500);
  /*border: 1px solid rgba(255, 255, 255, 0.16);*/
  transition: scale 2s;
}


.icon {
  min-height: 58px;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  /*border: 1px solid rgba(255, 255, 255, 0.16);*/
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
  transition: scale 2s;
}

.multiline {
  flex-wrap: wrap;
  height: auto !important;
}

.dock.sm {
  padding: 0.5em 0.25em !important;
  transition: opacity 2s;
}

.dock {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 76px;
  padding: 0.5em 0.5em;
  border-radius: 16px;
  opacity: 1;
  gap: 0.5em;
}
</style>
