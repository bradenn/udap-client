<script>
import Entity from "../components/entity/Entity.vue";
import Element from "../components/Element.vue";
import Group from "../components/Group.vue";
import Pane from "../components/Pane.vue";
import Context from "../components/Context.vue";
import Header from "../components/Header.vue";
import Weather from "../components/Weather.vue";
import Graph from "../components/Graph.vue";
import Clock from "../components/Clock.vue";
import Room from "./Room.vue";
import Spectrum from "../components/entity/Spectrum.vue";

export default {
  components: {Spectrum, Room, Clock, Graph, Weather, Header, Context, Pane, Group, Entity, Element},
  data() {
    return {
      since: "",
      header: {
        name: "Bedroom",
        icon: "􀯱",
      },
      scenes: [
        {
          name: "Passive",
          level: 25,
          cct: 5000
        },
        {
          name: "Chill",
          level: 40,
          cct: 4100
        }
      ],
      past: 0,
      master: 0,
      moving: false,
      multi: false,
      levels: [],
      order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selecting: true,
      selected: [],
      current: 1,
      edit: false,
    }
  },

  computed: {

    entities: function () {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }


    }
  },
  methods: {
    updateAll(e) {
      this.entities.forEach(entity => {
        entity.state.level = e
      })
    },
    sceneRun: function (scene) {
      switch (scene) {
        case "passive":

      }
    },
    pFront: function (v) {
      this.order = [v, ...this.order.filter(a => a !== v)]
      console.log(this.order)
    },
    start: function (event) {
      if (!this.edit) return;
      event.dataTransfer.setData("id", event.target.id)
    },
    drag: function (event) {
      if (!this.edit) return;
      event.preventDefault();
    },

    allow: function (event) {
      if (!this.edit) return;
      event.preventDefault()
      if (event.target.classList.contains('cove')) {
        event.target.classList.add('dragover')
      }

    },
    toggle: function () {
      this.$root.state.target = "main-control"
      this.$root.state.context = !this.$root.state.context
    },
    drop: function (event) {
      if (!this.edit) return;
      if (event.target.children.length > 1) {
        return
      }

      event.preventDefault();
      let dat = event.dataTransfer.getData("id");
      event.target.appendChild(document.getElementById(dat));
      event.target.classList.remove('dragover')
    },
    leave: function (event) {
      if (!this.edit) return;
      event.target.classList.remove('dragover')
    },
    forbid: function (event) {
      if (!this.edit) return;
      event.preventDefault()
      event.target.classList.remove('dragover')
    },
    groupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
  }
}

</script>

<template>

  <div class="context-container d-flex gap-1 mt-1">
    <div v-if="false" class="my-1" style="width: 22rem;">
      <div class="notification">
        <div class="icon">􀛮</div>
        <div class="notification-header">
          <div class="title">
            Remote Proximity Alert
          </div>
          <div class="message">
            Dr. QT Pi has arrived at your location.
          </div>
        </div>
        <div class="time">8m ago</div>
      </div>
    </div>
<!--    <Weather></Weather>-->
    <div class="context-container-lg cluster gap">
    <Entity v-for="entity in this.$root.entities" :id="entity.id" :key="entity.id" :entity="entity" small></Entity>
    </div>
<!--    -->
    <!--  &gt;
        </div>-->
    <!--    {{Object.values(this.$root.entities).map(o => ({name: o.name, attributes: o.attributes}))}}-->
    <!--    <div class="element">
          <Room></Room>
        </div>
        <Context class="" icon="􀺳" name="Multi">
          <div class=" h-100 d-flex flex-row gap w-100 justify-content-center">
            <div class="w-25"></div>
            <div class="w-75">
              <Header :target="header"></Header>
              <div class="d-flex flex-column gap pt-2">
                <div class="top context-container context-container-sm gap" v-on:click.stop>
                  ddd
                </div>
              </div>
            </div>
          </div>
        </Context>-->
    <!--    <div class="cluster gap-1 mt-auto">

    &lt;!      <Context class="" icon="􀺳" name="Multi">
            <div class=" h-100 d-flex flex-row gap w-100 justify-content-center">
              <div class="w-25"></div>
              <div class="w-75">
                <Header :target="header"></Header>
                <div class="d-flex flex-column gap pt-2">
                  <div class="top context-container context-container-sm gap" v-on:click.stop>
                    <div class="v-bar element justify-content-between" style="width: 24.33rem;">
                      <div class="h-bar justify-content-start align-items-center align-content-center pb-1">
                        <div class="label-xxs label-o2 label-w600">􀛮</div>
                        <div class="label-xxs label-o4 label-w500">&nbsp;&nbsp;Root</div>
                        <div class="fill"></div>
                        <div class="h-bar gap px-2">
                          <div class="label-xxs label-o3">9%</div>
                        </div>
                      </div>

                      <div class="">
                        <div>
                          <input
                              v-model="master"
                              class="dock dock-small slider"
                              max="100"
                              min="0" step="5"
                              type="range"
                              @change="updateAll(master)">
                        </div>
                      </div>
                    </div>
                    <Entity
                        v-for="entity in entities"
                        :id="entity.id"
                        :key="entity.id"
                        :draggable="this.edit"
                        :entity="entity"
                        :level="entity.state.level"
                        power-level
                    ></Entity>
                  </div>
                </div>
              </div>
            </div>
          </Context>&gt;
        </div>-->


  </div>
</template>

<style>


</style>
