<script>

export default {
  data() {
    return {}
  },
  props: {
    title: String,
    icon: String,
    subtitle: String,
    meta: String
  }
}

</script>

<template>
  <div class="element toggle d-flex flex-column justify-content-between" draggable="true">
    <div class="d-flex justify-content-between align-items-center align-content-center">
      <div class="d-flex">
        <i class="bi toggle-icon" v-bind:class="icon"></i>
        <div class="toggle-title">{{ title }}</div>
      </div>
      <div><i class="bi toggle-icon bi-toggle-on" style="font-size: 1.2em;"></i></div>
    </div>
    <div class="d-flex justify-content-between align-items-baseline">
      <div class="toggle-status">{{ subtitle }}</div>
      <div class="toggle-meta">{{ meta }}</div>
    </div>
  </div>
</template>

<style>

.toggle-icon {
  color: var(--bs-gray-400);
  opacity: 0.75;
}

.toggle-title {
  font-weight: 700;
  margin-left: 0.5em;
  opacity: 0.75;
}

.toggle-status {
  font-weight: 600;
  opacity: 0.5;
}

.toggle-meta {
  color: var(--bs-gray-400);
  font-weight: 400;
  font-size: 12px;
  opacity: 0.75;
}


.toggle {

  aspect-ratio: 2.5/1.4142135624;
  padding: 0.75em 1em !important;
}
</style>
