<script>
import App from "../App.vue";
import Form from "../Form.vue";
import Selector from "../Selector.vue";
import Pane from "../Pane.vue";
import Group from "../Group.vue";


export default {
  components: {Group, Pane, Selector, Form, App},
  data() {
    return {
      commit: {
        name: "",
        module: "",
        locked: false,
        alias: "",
        icon: "",
        visible: false,
        state: "",
        id: "",
        frequency: 0,
        type: ""
      },
      module: {
        frequency: {
          name: "Polling Frequency",
          key: 'frequency',
          value: 1,
          default: 1,
          commit: null,
          values: [{name: "10 ns", value: 0.1}, {name: "100 µs", value: 0.1}, {name: "1 ms", value: 0.1}, {
            name: "1 s",
            value: 1
          }, {name: "3 s", value: 3}, {name: "10 s", value: 30}, {name: "1 m", value: 30}, {name: "1 h", value: 30}]
        },
      },
      state: {
        locked: {
          name: "State Lock",
          key: 'locked',
          value: this.entity.locked,
          default: false,
          commit: null,
          values: [{name: "Mutable", value: false}, {name: "Immutable", value: true}]
        },
        type: {
          name: "Type",
          key: 'type',
          value: this.entity.type,
          default: this.entity.type,
          commit: null,
          values: [{name: "Switch", value: 'switch'}, {name: "Dimmer", value: 'dimmer'}, {
            name: "Interface",
            value: 'interface'
          }],
        }
      },
      appearance: {
        visible: {
          name: "Visibility (local)",
          key: 'visible',
          value: true,
          default: true,
          commit: null,
          values: [
            {name: "Visible", value: true},
            {name: "Hidden", value: false}
          ]
        },
        alias: {
          name: "Alias",
          key: 'alias',
          type: 'text',
          value: this.entity.alias,
          default: '',
          commit: null,
        },
        icon: {
          name: "Icon",
          key: 'icon',
          icon: true,
          value: "bulb",
          default: 'bulb',
          commit: null,
          values: [
            {name: "􀛭", value: "bulb"},
            {name: "􀋥", value: "bolt"},
            {name: "􀡷", value: "plug"},
            {name: "􀍺", value: "dial"},
            {name: "􀇭", value: "glow-up"},
            {name: "􀇯", value: "glow-o"},
            {name: "􀝌", value: "flashlight"},
            {name: "􀆫", value: "sun"},
            {name: "􀆨", value: "power"},
            {name: "􁁋", value: "fan"},
          ]
        },

      }
    }
  },
  props: {
    entity: Object,
  },
  beforeCreate() {

  },
  created() {
    this.pull()
  },
  watch: {
    'appearance': {
      handler(newPreferences, oldPreferences) {
        this.pushValues(this.appearance)
      }, deep: true
    },
    'state': {
      handler(newPreferences, oldPreferences) {
        this.pushValues(this.state)
      }, deep: true
    },
    'module': {
      handler(newPreferences, oldPreferences) {
        this.pushValues(this.module)
      }, deep: true
    },
    'entity': function (d) {
      this.waiting = false
      this.current = this.toObject(d.state).value
      this.newState = this.current
    },
    'this.$root.session.subscriptions': function (d) {
      console.log(d)
    }
  },
  methods: {
    pull() {
      Object.keys(this.entity).forEach(k => this.commit[k] = this.entity[k])
    },
    commitC() {
      let cache = {};
      Object.keys(this.entity).forEach(k => cache[k] = this.commit[k])
      let target = 'entity'
      let operation = 'update'
      let payload = JSON.stringify(cache)
      this.$emit('toUdap', {target, operation, payload})
      this.icon = this.commit.icon
    },
    commitChanges() {

    },
    pushValues(ref) {
      console.log(Object.keys(ref).map(t => `${JSON.stringify(ref[t])}`))
    },
    setState(s) {
      this.waiting = true
      this.$root.request("entity", "state", {
        name: this.entity.name,
        module: this.entity.module,
        state: {value: Number(s)}
      })
    },
    toObject(b) {
      return JSON.parse(atob(b))
    },
    computeClasses() {
      let cls = [];
      if (this.active()) cls.push("active")
      if (this.manage) cls.push("manage")
      return [].join(" ")
    },
    subscribed() {
      return this.$root.session.subscriptions.includes(this.entity.id)
    },
    active() {
      return false
    },
    onChange(ref, name) {
      return function (event) {
        this.commit[name] = event

      }
    },
    subscribe() {
      if (!this.subscribed()) this.$root.session.subscriptions.push(this.entity.id)
    },
    unsubscribe() {
      if (this.subscribed()) this.$root.session.subscriptions = this.$root.session.subscriptions.filter(i => i !== this.entity.id)
    },
    beginClosing(event) {
      console.log(event)

    },
    toggleSubscription() {
      this.subscribed() ? this.unsubscribe() : this.subscribe()
    },
  }
}

</script>

<template>
  <Pane>
    <Group :name="this.entity.name" icon="􀛭">
      <div class="flex-grow-1">
        <div class="h-bar gap-1">
          <div class="h-bar">
            <div class="bar-bg pr-1">

            </div>
            <div class="alias mb-2">{{ this.entity.name }}</div>
          </div>
          <div class="fill"></div>
          <div class="h-bar text-muted"></div>
          <a class="h-bar bar-bg" data-dismiss="modal" href="#">􀆄</a>
        </div>
        <div class="row flex-gap gx-2 gy-2">
          <div class="col-md-6 col-sm-12">

            <Form title="Appearance">
              <Selector
                  v-for="(v, k) in this.appearance"
                  :key="k"
                  :default="{value: v.default}"
                  :name="v.name"
                  :on-change="onChange(this.appearance, k)"
                  :options="v.values"
                  :text="v.type === 'text'"
                  :value="{value: v.value}"
              ></Selector>
            </Form>

          </div>
          <div class="col-md-6 col-sm-12">
            <Form title="State">
              <Selector
                  v-for="(v, k) in this.state"
                  :key="k"
                  :default="{value: v.default}"
                  :name="v.name"
                  :on-change="onChange(this.state, k)"
                  :options="v.values"
                  :text="v.type === 'text'"
                  :value="{value: v.value}"
              ></Selector>
              <Selector
                  v-for="(v, k) in this.module"
                  :key="k"
                  :default="{value: v.default}"
                  :name="v.name"
                  :on-change="onChange(this.module, k)"
                  :options="v.values"
                  :text="v.type === 'text'"
                  :value="{value: v.value}"
              ></Selector>
            </Form>
          </div>
        </div>
      </div>
    </Group>

  </Pane>
</template>

<!--<style lang="scss" scoped>

.pr-1 {
  margin-right: 0.5rem !important;
}

.alias {
  font-size: 16px;
  font-weight: 600;
  color: $light-3;
  height: 24px;
}



.module {
  font-family: "SF Compact Display", sans-serif;
  font-size: 14px;
  font-weight: 600;

  color: rgba(255, 255, 255, 0.8);
  text-shadow: 1px 1px 12px rgba(0, 0, 0, 0.25);
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

.modal-content {
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  padding-top: 7.5em;
  background-color: transparent;
  border: none !important;
}
.bar-bg {
  @extend .surface;
  color: rgb(255, 255, 255, 0.5);
  height: 24px !important;
  font-size: 10px;
  line-height: 24px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.0425);
  border-radius: 4px;
  padding: 0 0.5rem;
}
.entity-control {
  @extend .element;

  box-shadow: 0 0 64px 8px rgb(0 0 0 / 32%) !important;
  padding: 0.5rem;
}

.entity-menu {
  @extend .element;

  position: absolute !important;

  z-index: 1000 !important;

  width: 100%;

  height: 12em;
  left: 0;

  margin: 0;
}

/* Entity */

.entity {
  @extend .element;
  width: 100%;
  padding: 0.40rem 0.40rem;

}

.label {
  padding-left: 0.5rem;
  font-weight: 500;
  font-size: 12px;
}


.working {
  font-size: 1em;
  opacity: 1;
  animation: surge 250ms;
}

.entity.light-active {
  box-shadow: inset 0 0 2px 1.2px darken($fog, 40%), 0 0 4px 2px rgba(255, 199, 143, 0.025);

}

@keyframes surge {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}

.entity.active {
  background-color: rgba(255, 255, 255, 0.08);
}

.play {
  font-size: 3em !important;
  line-height: 1em;
}

.icon > .bi {
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
}


.draw {
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 16px rgba(255, 103, 0, 0.8);
}

.control {

}

@keyframes controller {
  0% {

  }
  100% {

  }
}

.seek {
  flex: 1 1 auto;
  height: 4px;
  width: 100%;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(64px);
}


</style>-->
