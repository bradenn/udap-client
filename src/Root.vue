<script>
import Element from "./components/Element.vue";
import Frame from "./components/Pane.vue";
import SimpleKeyboard from "./components/Keyboard.vue";
import Loading from "./components/Loading.vue";
import Context from "./components/Context.vue";


function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default {
  components: {Context, Loading, SimpleKeyboard, Element, Frame},
  data() {
    return {
      state: {
        keyboard: false,
        waiting: false,
        accepting: false,
        error: "",
        input: "",
        last: new Date(),
        history: []
      },
      preferences: {
        accent: "slate",
        background: "viridian",
        blur: 5,
        input: "mouse",
        padding: 4,
        scale: "1.25",
        theme: "dark"
      },
      config: {
        host: "localhost",
        port: 3020,
      },
      connection: {
        connected: false,
        connecting: false,
        websocket: undefined,
        error: {}
      },
      entities: {},
      session: {
        token: "unset",
        subscriptions: [],
        metadata: {
          endpoint: {},
          modules: [],
          entities: []
        }
      }
    }
  },
  watch: {
    preferences: {
      handler(a, b) {
        this.saveConfig()
      }, deep: true
    },
    config: {
      handler(a, b) {
        this.saveConfig()
      }, deep: true
    },
    session: {
      handler(a, b) {
        this.saveConfig()
      }, deep: true
    }
  },
  emits: {
    toUdap: ({target, operation, payload}) => {
      this.connection.websocket.send(JSON.stringify({
            target: target,
            operation: operation,
            body: payload
          }
      ));
    }
  },
  created() {
    this.isConfig()
    this.loadConfig()
    this.connect()
  },
  computed: {
    bgImg() {
      return `/custom/${this.preferences.background || "viridian"}@4x.png`
    }
  },
  beforeUnmount() {
    this.disconnect()
  },
  methods: {

    saveConfig() {

      let obj = {};
      obj.preferences = this.preferences
      obj.config = this.config
      obj.session = this.session
      let str = JSON.stringify(obj)
      localStorage.setItem("context", str)
    },
    isConfig() {
      if(localStorage.getItem("context") === null) {
        this.saveConfig()
        this.$router.push("/")
      }
    },
    loadConfig() {
      let cnf = localStorage.getItem("context")

      let obj = JSON.parse(cnf);

      if(obj.preferences != null) this.preferences = obj.preferences
      if(obj.config != null) this.config = obj.config
      if(obj.session != null) this.session = obj.session
      let str = JSON.stringify(obj)
      localStorage.setItem("context", str)
    },
    updateLocal(section, body) {
      let context = localStorage.getItem(section);
      if (!context) {
        localStorage.setItem(section, JSON.stringify(body))
        return
      }
      let object = JSON.parse(context)
      object = body
      localStorage.setItem(section, JSON.stringify(object))
    },
    pullUpdates(section) {
      let context = localStorage.getItem(section);
      if (context === 'undefined') {
        localStorage.setItem(section, JSON.stringify(prev))
        return
      }
      return JSON.parse(context)
    },
    setTheme(theme) {
      this.preferences.theme = theme
    },
    setBackground(name) {
      this.preferences.background = name
    },
    enroll() {

    },
    request(target, operation, body) {
      this.connection.websocket.send(JSON.stringify({
            target: target,
            operation: operation,
            body: body
          }
      ));
    },
    requestId(target, operation, body, id) {
      this.connection.websocket.send(JSON.stringify({
            target: target,
            operation: operation,
            payload: body,
            id: id
          }
      ));
    },
    sendAction(instanceId, action) {
      this.connection.websocket.send(JSON.stringify({
            target: "instance",
            operation: "action",
            body: {
              id: instanceId,
              action: action
            }
          }
      ));
    },
    modifyInstance(instanceId, name, desc) {
      this.connection.websocket.send(JSON.stringify({
            target: "instance",
            operation: "modify",
            body: {
              id: instanceId,
              name: name,
              description: desc,
            }
          }
      ));
    },
    sendDelete(instanceId) {
      this.connection.websocket.send(JSON.stringify({
            target: "instance",
            operation: "delete",
            body: {
              id: instanceId,
            }
          }
      ));
    },
    sendReset(instanceId) {
      this.connection.websocket.send(JSON.stringify({
            target: "instance",
            operation: "reset",
            body: {
              id: instanceId
            }
          }
      ));
    },
    getMetadata() {
      this.connection.websocket.send(JSON.stringify({
            target: "controller",
            operation: "compile",
            body: {}
          }
      ));
    },
    connect() {
      if (this.connection.connected || this.session.token === "") return

      let host = `ws://${this.config.host}:${this.config.port}/socket/${this.session.token}`

      this.connection.websocket = new WebSocket(host)
      this.connection.connecting = true
      this.connection.websocket.onmessage = this.onMessage
      this.connection.websocket.onopen = this.onConnect
      this.connection.websocket.onclose = this.onClose
      this.connection.websocket.onerror = this.onError
    },
    disconnect() {
      this.connection.websocket.close()
      this.connection.connecting = false
      this.connection.connected = false
    },
    onError(event) {
      this.state.error = JSON.stringify(event)
    },
    onConnect(event) {
      this.accepting = true
      this.connection.connecting = false
      this.connection.connected = true
      this.accepting = false
    },
    onMessage(event) {
      this.accepting = true
      let data = JSON.parse(event.data)
      if (!data) console.log("Invalid JSON received")
      switch (data.operation) {
        case "metadata":
          this.state.last = new Date()
            this.state.waiting = false
          this.session.metadata = data.body
          break
        default:
          console.log(data);
      }
      this.accepting = false
    },
    onClose(event) {
      this.connection.connecting = false
      this.connection.connected = false
      setTimeout(this.connect, 5000)
    },
    rootClasses() {
      return `${this.preferences.theme === 'dark' ? 'theme-dark' : 'theme-light'} ${this.preferences.input === 'touchscreen' ? 'input-touch' : ''} accent-${this.preferences.accent} blurs-${this.preferences.blur} padding-${this.preferences.padding}`
    },
  }

}

</script>

<template>
  <div class="root" v-bind:class="rootClasses()">
    <img :key="bgImg" :src="bgImg" alt="Background" class="backdrop" style=""/>
    <router-view/>

    <Context :open="!!this.state.error">
      {{this.state.error}}
    </Context>
    <SimpleKeyboard v-if="state.keyboard" :input="this.state.input"></SimpleKeyboard>
  </div>
</template>

<style lang="scss">
@import "/scss/app";

.element {
  @extend .bg-blur;
  box-shadow: 0 0 12px 2px rgb(0 0 0 / 20%);
  transition: background-color 100ms ease, backdrop-filter 500ms ease;
}

.window {
  @extend .surface;
}

.root {
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  border-radius: 1rem 1rem 1rem 1rem !important;
}

.backdrop {

  z-index: -2 !important;
  top: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  object-fit: cover;
  width: 100vw;

  height: 100vh;
  animation: switch 0.25s ease-in-out;
}

@keyframes switch {
  from {
    filter: blur(4px);
    opacity: 0.8;
  }
  to {
    filter: blur(0px);
    opacity: 1;
  }
}
</style>
