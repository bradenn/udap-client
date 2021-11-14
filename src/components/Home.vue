<script>
import WeatherWidget from "./core/WeatherWidget.vue";
import Downup from "./modules/Downup.vue";
import Media from "./modules/Media.vue";
import Element from "./partials/Element.vue";
import Board from "./partials/Board.vue";
import Dock from "./partials/Dock.vue";
import Entity from "./modules/Entity.vue";

export default {
  components: {WeatherWidget, Downup,Entity, Dock, Media, Element, Board},
  data() {
    return {
      hold: false,
    }
  },
  watch: {},
  computed: {
    instances() {
      return this.updateInstances(this.$root.session.instances)
    }
  },
  created() {
  },
  beforeDestroy() {

  },
  methods: {
    updateInstances(data) {
      return Object.values(data).map(a => {
        return a ? JSON.parse(a) : []
      }).sort((a, b) => a.type > b.type ? -1 : 1)
    }
  },
}
</script>

<template>

  <div class="deck mt-4" style="perspective: 10em;">
    <div class="cell element" style=""></div>
    <div class="cell element" style=""></div>

    <Entity
        class="cell"
        v-for="entity in this.$root.session.metadata.entities"
        :state=entity.state
        :name=entity.name
        :instance-id=entity.instanceId
        icon=""
        meta="560mW"
    ></Entity>


  </div>

  <!--  <div class="h-100" v-if="false">


      <div class="home" >

        <Board>
          <WeatherWidget></WeatherWidget>
          <div v-for="instance in this.instances" class="">
            <Element
                v-if="instance.type === 'hs100.so'"
                :subtitle=instance.state
                :title=instance.name
                icon="bi-lamp-fill"
                meta="560mW"
            ></Element>
            <Downup v-if="instance.type === 'downup'"
                    v-bind:data="JSON.parse(instance.data)"
                    v-bind:name="instance.name"></Downup>

          </div>

        </Board>


      </div>
    </div>-->


</template>

<style>

.deck {
  display: flex;
  height: 65vh;
  gap: 1em;
  justify-content: space-evenly;

}

.cell {
  width: 25%;
  height: 10em;
  aspect-ratio: 2/1;

  background-color: var(--bs-fog);
}

.home {


  align-items: center;
  margin-top: 1em;
  gap: 0.5em;
}

.card {
  margin-top: 1em;
  column-gap: 0.5em !important;
}
</style>
