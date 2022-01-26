<script>

export default {
  data() {
    return {}
  },
  props: {
    small: Boolean,
    title: String,
  }
}

</script>

<template>
  <div class="form">
    <div class="form-title">{{ title }}</div>
    <div class="h-sep"></div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>

.form {
  
  height: 100%;
  border-radius: 6px;
}

.form-title {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  padding: 0;
}

</style>
