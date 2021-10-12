<script>

export default {
  data() {
    return {
      loaded: false,
      backgrounds: ["viridian", "painfulpurple"],
      background: "viridian",
      colors: [
        {name: "Blue", cls: "accent-blue"}, {name: "Green", cls: "accent-green"}, {
          name: "Orange",
          cls: "accent-orange"
        },
        {name: "Red", cls: "accent-red"}],
    }
  },
  created() {
    this.getBackground()
  },
  methods: {
    getBackground() {
      this.background = this.$root.getBackground()
      this.loaded = true
    },
    previewBackground(name) {
      return `background-image: url('/custom/${name}.png')`
    },
    setBackground(name) {
      this.$root.setBackground(name)
      this.getBackground()
    }
  },
}
</script>

<template>
  <div class="element px-3 mb-3">
    <div class=" d-flex justify-content-between mb-3">
      <div>
        <h5 class="mb-0 mt-1">Terminal Appearance</h5>
        <span class="text-muted small mt-0">Modify this terminal's apearance.</span>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4 ">
        <h6 class="">Background</h6>
      </div>
      <div class="col-sm-8">
        <div class="gallery my-2" v-if="loaded">
          <div v-for="option in backgrounds" class="bg-preview"
               v-bind:class="this.background === option?'bg-active':''" v-on:click="setBackground(option)"
               v-bind:style="previewBackground(option)"><span v-if="this.background === option">CURRENT</span></div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4 ">
        <h6 class="">Material Theme</h6>
      </div>
      <div class="col-sm-8">
        <div class="gallery my-2">
          <div class="element selector" v-bind:class="this.$root.dark?'active':''"
               v-on:click="this.$root.setTheme(true)">
            Dark
          </div>
          <div class="element selector" v-bind:class="!this.$root.dark?'active':''"
               v-on:click="this.$root.setTheme(false)">
            Light
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4 ">
        <h6 class="">Accent Color</h6>
      </div>
      <div class="col-sm-8">
        <div class="gallery my-2">
          <div class="element selector" v-for="color in colors" v-on:click="this.$root.accent = color.cls" v-bind:class="this.$root.accent === color.cls ? 'active':''">
            {{ color.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.flex-gap {
  gap: 0.5em;
}

.selector {
  font-size: 12px;
  font-weight: 700;
  border-radius: 10px !important;
  line-height: 1.2em;
  width: 22.5%;
  padding: 0.25em 0.1em;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.11);
}

.gallery {
  display: flex;
  column-gap: 1em;
}

.text-icon {
  min-height: 12px;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  /*border: 1px solid rgba(255, 255, 255, 0.16);*/
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
  transition: scale 2s;
}

.text-icon {
  min-height: 12px;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  /*border: 1px solid rgba(255, 255, 255, 0.16);*/
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
  transition: scale 2s;
}

.bg-active {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  background-blend-mode: darken;
  color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 5px #000;
}

.bg-preview {
  background-repeat: no-repeat;
  background-size: 101%;
  aspect-ratio: 1/1.41;
  width: 25%;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.11);
}
</style>
