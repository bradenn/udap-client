<script>
function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default {
  data() {
    return {
      connection: {
        connected: false,
        connecting: false,
        websocket: undefined
      },
      preferences: {
        theme: "dark",
        accent: "blue",
        background: "viridian"
      },
      config: {
        host: "localhost",
        port: 3020,
      },
      session: {
        token: "unset",
        subscriptions: [],
        instances: [],
        metadata: {
          modules: []
        }
      }
    }
  },
  watch: {
    preferences: {
      handler(newPreferences, oldPreferences) {
        let context = localStorage.getItem("context");
        let object = JSON.parse(context)
        object.preferences = newPreferences
        localStorage.setItem("context", JSON.stringify(object))
      }, deep: true
    },
    session: {
      handler(newSession, oldSession) {
        let context = localStorage.getItem("context");
        let object = JSON.parse(context)
        object.session = newSession
        localStorage.setItem("context", JSON.stringify(object))
      }, deep: true
    }
  },
  created() {
    let context = localStorage.getItem("context");
    let object = JSON.parse(context)
    this.connection = object.connection
    this.preferences = object.preferences
    this.config = object.config
    this.session = object.session
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
    setTheme(theme) {
      this.preferences.theme = theme
    },
    setBackground(name) {
      this.preferences.background = name
    },
    enroll() {
      this.connection.websocket.send(JSON.stringify({
            target: "endpoint",
            operation: "enroll",
            body: {
              instances: this.session.subscriptions
            }
          }
      ));
    },
    request(target, operation, body) {
      this.connection.websocket.send(JSON.stringify({
            target: target,
            operation: operation,
            body: body
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
            target: "endpoint",
            operation: "metadata",
            body: {}
          }
      ));
    },
    connect() {
      if (this.connection.connected || this.session.token === "") return

      let host = `ws://${this.config.host}:${this.config.port}/ws/${this.session.token}`

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
      console.log(event)
    },
    onConnect(event) {
      this.connection.connecting = false
      this.connection.connected = true
      this.enroll()
    },
    onMessage(event) {
      let data = JSON.parse(event.data)
      if (!data) console.log("Invalid JSON received")
      switch (data.operation) {
        case "update":
          this.session.instances = data.body
          break
        case "metadata":
          this.session.metadata = data.body
          break
        default:
          console.log(data);
      }
    },
    onClose(event) {
      this.connection.connecting = false
      this.connection.connected = false
      setTimeout(this.connect, 5000)
    },
  }
}
</script>

<template>

  <div class="root"
       v-bind:class="`${this.preferences.theme === 'dark'?'theme-dark':'theme-light'} ${this.preferences.accent}`">
    <img class="backdrop" :src="bgImg" :key="bgImg" alt="Background" style=""/>
    <router-view class="pt-4"/>
  </div>
</template>

<style>

.root {
  width: calc(100vw - 1em);
  height: calc(100vh - 1em);
  overflow: hidden;
  /*border: 4px solid rgba(var(--bs-primary-rgb), 0.5);*/
  border-radius: 2em;
  padding: 0em;
  margin: 0.5em;
  border: 4px solid transparent;
}


.backdrop {
  z-index: -1;
  top: 0;
  left: 0;

  overflow: hidden;
  position: absolute;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  background: #2f363d;
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
