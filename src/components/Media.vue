<script>

export default {
  data() {
    return {
      endpoints: null,
      currentTime: 0,
      duration: 0,
      playing: false,
    }
  },
  props: {
    multiline: Boolean
  },
  created() {
    this.getPlaying()
    this.mediaTimer = setInterval(this.updateDuration, 1000)
  },
  methods: {
    updateDuration() {
      this.currentTime += this.playing ? 1000 : 0;
    },
    runFunction(id, name) {
      const config = {
        headers: {Authorization: `Bearer ${this.$JWT}`}
      }
      this.$http.get(`http://localhost:3020/instances/${id}/func/${name}`, config).then(res => {
        this.getPlaying()
      }).catch(err => {
        this.error = err
        this.loading = false
      })
    },
    durationPercent() {
      return this.currentTime / this.duration
    },
    readTime(ms) {
      let a = ms / 1000;
      let b = a % 60
      if (this.currentTime >= this.duration) this.getPlaying()
      return `${Math.floor(a / 60)}:${Math.round(b)}`
    },
    togglePlay() {
      if (this.playing) {
        this.runFunction('6146b26c08aa0c4a0ac7ed38', 'pause')
        this.playing = false
      } else {
        this.runFunction('6146b26c08aa0c4a0ac7ed38', 'play')
        this.playing = true
      }

    },
    getPlaying() {

      const config = {
        headers: {Authorization: `Bearer ${this.$JWT}`}
      }

      this.$http.get("http://localhost:3020/instances/6146b26c08aa0c4a0ac7ed38/func/currentlyPlaying", config).then(res => {
        this.endpoints = res.data
        this.currentTime = this.endpoints.progress_ms
        this.duration = this.endpoints.item.duration_ms;

        this.playing = this.endpoints.is_playing
        this.loading = false
      }).catch(err => {
        this.error = err
        this.loading = false
      })

    },
  }
}

</script>

<template>
  <div class="element media" v-if="endpoints">
    <div class=" w-100">
      <div class="d-flex flex-row align-items-center">
        <img class="thumbnail" v-bind:src="endpoints.item.album.images[2].url" alt="Album"/>
        <div class="mx-2 flex-grow-1">
          <div class="lh-1">
            {{ endpoints.item.name }}
          </div>
          <div class="text-muted small">
            {{ endpoints.item.artists[0].name }}
          </div>

        </div>
      </div>
    </div>
    <div class="seek small my-3">
      <div class="seek" v-bind:style="`width:${durationPercent()*100}%`"></div>
      <div class="d-flex justify-content-between small">
        <div>{{ readTime(this.currentTime) }}</div>
        <div>{{ readTime(this.duration) }}</div>
      </div>
    </div>
    <div class="controls">
      <i class="bi bi-skip-start-fill"></i>
      <i class="bi play" v-bind:class="this.playing?' bi-pause-fill':' bi-play-fill'" v-on:click="togglePlay"></i>
      <i class="bi bi-skip-end-fill"></i>
    </div>
  </div>

</template>

<style>

.play {
  font-size: 3em !important;
  line-height: 1em;
}
.icon > .bi {
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
}

.seek {
  flex: 1 1 auto;
  height: 4px;
  width: 100%;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
}

.thumbnail {
  height: 100%;
  width: 48px;
  border-radius: 10px;
  aspect-ratio: 1 / 1;
  border: 1px solid;
}

.media {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: start;
}

.controls > i {
  margin-inline: 0.25em;
  line-height: 1em;
  font-size: 2em;
}

.controls {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
