<script>

export default {
  data() {
    return {
      loaded: false,
      backgrounds: ["viridian", "neonorange", "deepred", "painfulpurple"],
      background: "viridian"
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
    <div class="element px-3">
      <h5 class="mb-1 mt-1">Background</h5>
      <div class="gallery my-2" v-if="loaded">
        <div v-for="option in backgrounds" class="bg-preview"
             v-bind:class="this.background === option?'bg-active':''" v-on:click="setBackground(option)"
             v-bind:style="previewBackground(option)"><span v-if="this.background === option">CURRENT</span></div>
      </div>
    </div>
</template>

<style scoped>
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
  width: 12.5%;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.11);
}
</style>
