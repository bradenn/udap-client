<script>

export default {
  data() {
    return {

    }
  },
  props: {
    multiline: Boolean
  }
}

</script>

<template>
  <div class="dock" v-bind:class="multiline?'multiline':''">
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

.dock {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 76px;
  padding: 0.5em 0.5em;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.11);
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
  opacity: 1;
  gap: 0.5em;
}
</style>
