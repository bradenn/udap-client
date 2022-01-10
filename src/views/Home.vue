<script>
import Entity from "../components/entity/Entity.vue";
import Element from "../components/Element.vue";
import Group from "../components/Group.vue";
import Pane from "../components/Pane.vue";
import Context from "../components/Context.vue";
import Header from "../components/Header.vue";
import Weather from "../components/Weather.vue";
import Graph from "../components/Graph.vue";

export default {
  components: {Graph, Weather, Header, Context, Pane, Group, Entity, Element},
  data() {
    return {
      since: "",
      header: {
        name: "Multi Controller",
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

      if (!this.$root.session.metadata.entities) return []
      this.$root.session.metadata.entities.forEach(e => {
        if (e.state === null) return
        if (!this.levels[e.id]) this.levels[e.id] = 0
        if ((this.levels[e.id]) !== (e.state.level)) {
          this.levels[e.id] = e.state.level
        }
      })

      return this.$root.session.metadata.entities.sort(compare)
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
    }
  }
}

</script>

<template>

  <div class="home gap w-100">
    <div class="cluster gap my-2">
      <Entity
          v-for="entity in entities"
          :id="entity.id"
          :key="entity.id"
          :draggable="this.edit"
          :entity="entity"
          small
      ></Entity>
      <Context class="" icon="􀺳" name="Multi">
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
      </Context>
    </div>

    <div class="cluster gap my-2 ">
      <div v-for="scene in this.scenes" class="surface">
        <div class="h-bar justify-content-start align-items-center align-content-center">
          <div class="label-xxs label-o2 label-w600">􀊄</div>
          <div class="label-xxs label-o4 label-w500 px-1">&nbsp;&nbsp;{{ scene.name }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<style>
.orange {
  color: rgb(255, 95, 31);
}
</style>
