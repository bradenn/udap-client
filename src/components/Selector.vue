<script>

export default {
  name: "Selector",
  data() {
    return {}
  },
  created() {
  },
  props: {
   model: Object
  },
  methods: {
    change(value) {

    },
    optionClasses(option) {
    },

  }
}

</script>

<template>

  <div class="element">
    <div class="toolbar">
      <div class="toolbar-icon">{{model.icon}}</div>
      <div class="toolbar-title">&nbsp;&nbsp;{{ model.name }}</div>
      <div class="fill"></div>
    </div>

    <Dock class="surface" small>
      <slot></slot>
    </Dock>

  </div>
</template>

<style lang="scss">

.selector-text::placeholder {

}

.selector-text {


  border: none;
  width: 100%;
  outline: none;
}

.option.default:not(.active)::before {
  content: ' ';
  position: absolute;
  width: 1.2rem;
  height: 1px;
  margin-top: 1.8em;

  border-radius: 1px;
}

.selector-container {

  display: flex;
  flex-direction: row;
  flex-grow: 1;
  box-shadow: none;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 4px;
  height: 28px;
  padding: 0 0;
  border-radius: 8px;

}

.selector:last-of-type > .selector-container {
  margin-bottom: 0;
}

.option {
  display: flex;
  flex-direction: row;
  justify-content: center;

  align-items: center;

  border-radius: 6px;
  height: 24px;
  text-shadow: rgba(0, 0, 0, 0.05) 0 0 4px;

  flex-grow: 1;
  font-size: 0.7rem;
  font-weight: 400;
}

.option.active {


  background-color: rgba(255, 255, 255, 0.125) !important;
  font-size: 0.7rem;
  font-weight: 400;
  transition: background-color 250ms;
}


.tag {
  color: rgb(255, 255, 255, 0.5);
  height: 18px !important;
  font-size: 0.7rem;
  line-height: 18px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.0425);
  border-radius: 4px;
  padding: 0 0.5rem;
  animation: modified 250ms linear forwards;
}

@keyframes modified {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


</style>
