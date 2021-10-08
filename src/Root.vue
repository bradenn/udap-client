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
      connected: false,
      connecting: false,
      connection: null,
      endpointId: "",
      connectedSince: new Date(),
      backgroundImg: "",
      instances: {},
      metadata: null,
    }

  },
  watch: {
    '$instances'() {
      this.enroll()
    }
  },
  created: function() {

    this.getBg()
  },
  beforeUnmount() {
    this.disconnect()
  },
  methods: {
    connect() {
      this.connecting = true
      this.connection = new WebSocket(`ws://${this.$host}/ws`)
      this.connection.onmessage = this.onMessage
      this.connection.onopen = this.onConnect
      this.connection.onclose = this.onClose
    },
    onConnect(event) {
      this.connectedSince = new Date()
      this.endpointId = parseJwt(this.$sessionId).id
      this.enroll()
      this.connecting = false
      this.connected = true
      console.log("Connected to UDAP controller @ " + this.$host)
    },
    onMessage(event) {
      let data = JSON.parse(event.data)
      if(!data) console.log("Invalid JSON recieved")
      switch (data.type) {
        case "poll":
          this.instances = data.payload
          break
        case "metadata":
          this.metadata = data.payload
          console.log("Metadata updated")
          break
      }
    },
    onClose(event) {
      this.connected = false
      this.connecting = false
      setTimeout(this.connect, 5000)
    },
    disconnect() {
      this.connection.close()
      this.connecting = false
      this.connected = false
      console.log("Disconnected")
    },
    enroll() {
      this.connection.send(JSON.stringify({
            token: this.$sessionId,
            type: "enroll",
            payload: {
              instances: this.$instances
            }
          }
      ));
    },
    getBackground() {
      let bg = localStorage.getItem('background')
      if (!bg) this.setBackground('viridian')
      return localStorage.getItem('background')
    },
    setBackground(name) {
      localStorage.setItem('background', name)
      this.getBg()
    },
    getMetadata() {
      this.connection.send(JSON.stringify({
            token: this.$sessionId,
            type: "metadata",
            payload: {}
          }
      ));
    },
    getBg() {
      this.backgroundImg = `/custom/${localStorage.getItem('background') || "viridian"}@4x.png`
    }
  }
  ,
}
</script>

<template>
  <div class="root">
    <img class="backdrop" :src="backgroundImg" :key="backgroundImg" alt="Background"/>
    <router-view class="pt-4"/>
  </div>
</template>

<style>

.root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.backdrop {
  z-index: -1;
  top: -1vw;
  left: -1vw;
  overflow: hidden;
  position: absolute;
  width: 101vw;
  height: 100.75vh;
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
