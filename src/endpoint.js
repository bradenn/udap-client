class Endpoint {

    connected = false
    connecting = false
    connection = null

    constructor(sessionId) {
        this.sessionId = sessionId
        this.connect()
    }

    connect() {
        this.connecting = true
        this.connection = new WebSocket("ws://localhost:3020/ws")
        this.connection.onmessage = this.onMessage
        this.connection.onopen = this.onConnect
        this.connection.onclose = this.onClose
    }

    onConnect = (event) => {
        this.connection.send(JSON.stringify({
                token: this.sessionId,
                type: "enroll",
                payload: {
                    instances: ["f43e4cff-ee93-4265-9fc8-018318ae0b50"]
                }
            }
        ));
        this.connecting = false
        this.connected = true
        console.log("Connected")
    }

    disconnect = () => {
        this.connection.close()
        this.connecting = false
        this.connected = false
        console.log("Disconnected")
    }

    onMessage = (event) => {
        this.instances = JSON.parse(event.data)
    }

    onClose = (event) => {
        this.connected = false
        this.connecting = false
        setTimeout(this.connect, 5000)
    }

    getUUID = () => {
        return parseJwt(this.sessionId).id
    }

    isConnected = () => {
        return this.connected
    }
    isConnecting = () => {
        return this.connecting
    }
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default Endpoint
