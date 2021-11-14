<script>

export default {
  data() {
    return {}
  },
  props: {}
}

</script>

<template>
  <div class="board">
    <slot></slot>
  </div>

</template>

<style>
* {
  box-sizing: border-box;
}

.widget-xs {
  height: 4em;

  grid-column: span 1;
}

.widget-sm {
  height: 8em;

  grid-column: span 1;
}

.widget-md {
  height: 8em;
  grid-column: span 2;
}

.widget-lg {
  height: 16em;
  grid-column: span 2;
}

.board {
  display: grid;
  width: calc(100% - 3em);
  grid-template-columns: repeat(4, 25%);
  grid-gap: 1em 1em;
  grid-auto-flow: row dense;

}

.empty {
  padding: 0.5em 0.5em;
  border-radius: 16px;
  border: 2px dashed rgba(230, 230, 230, 0.16);
  background-color: rgba(50, 50, 50, 0.03);
  backdrop-filter: blur(2px);
  box-shadow: 0 8px 32px rgb(0 0 0 / 12%), 0 8px 24px rgb(0 0 0 / 11%);
  transition: background-color 100ms ease;
}


</style>
