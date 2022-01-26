<script>

export default {
  data() {
    return {

    }
  },
  props: {
  }
}

</script>

<template>
  <div class="sidebar element">
    <slot></slot>
  </div>
</template>

<style>
.sidebar{
  margin: 0;
  padding: 0.25em 0.25em;
}

.sidebar-header {
  padding-top: 0.125em;
  font-weight: 600;
  font-size: 14px;
}

.menu-icon {
  margin-right: 0.75em;
}

.menu {
  display: flex;
  flex-direction: column;

  padding: 0.5em 0.5em;
  min-width: 44em !important;
  /*border-radius: 10px 10px 10px 10px;*/

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.11);
  background-color: rgba(255, 255, 255, 0.1);
  justify-content: start;
}

.menu-item {
  align-items: center;
  align-content: center;
  font-family: 'SF Pro', sans-serif;
  font-weight: 400 !important;
  padding: 0.0em 0.8em;
  margin: 0.125em;

  min-height: 32px;
  line-height: 21px;

  border-radius: 4px !important;
  display: flex;
  justify-content: space-between;


  color: rgba(255, 255, 255, 0.6);
  transition: scale 2s;
}


</style>
