<script>

export default {
  name: "Dock",
  data() {
    return {}
  },
  props: {
    small: Boolean,
    os: Boolean,
  }
}

</script>

<template>
  <Element  class="dock" v-bind:class="`${small?'dock-small':''} ${small?'dock-os':''}`">
    <slot></slot>
  </Element>
</template>

<style lang="scss">

</style>
