const npmWebSocket = op.require('ws');

const
    inStartServer = op.inTrigger("Toggle Server"),
    inPort = op.inInt("Port", 8000),
    inMessage = op.inString("Message", "Hello world"),
    inBroadcastMessage = op.inTrigger("Broadcast Message"),
    inTargetClientID = op.inString("Target Client ID"),
    inSendToClientID = op.inTrigger("Send Message To Client ID"),

    outRunning = op.outBoolNum("Running", 0),
    outServerStarted = op.outTrigger("Server Started"),
    outServerStopped = op.outTrigger("Server Stopped"),
    outClientConnected = op.outTrigger("Client Connected"),
    outClientDisconnected = op.outTrigger("Client Disconnected"),
    outConnectedClients = op.outNumber("Total Clients", 0),
    outClientsArray = op.outArray("Connected Clients"),
    outReceivedData = op.outTrigger("Received Data"),
    outRawData = op.outString("Raw Data"),
    outClientID = op.outString("Client ID"),
    outValidJSON = op.outBoolNum("Valid JSON")

op.setPortGroup('Connection', [inPort, inStartServer, outConnectedClients, outClientsArray]);
op.setPortGroup('Messaging', [inMessage, inBroadcastMessage, inTargetClientID, inSendToClientID, outReceivedData, outRawData, outClientID, outValidJSON]);
op.setPortGroup('Status', [outRunning, outServerStarted, outServerStopped, outClientConnected, outClientDisconnected]);

let wss = null;
let serverClients = null;

const serverOpts = {
    port: 8000,
    perMessageDeflate: {
        zlibDeflateOptions: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        concurrencyLimit: 10,
        threshold: 1024
    }
};

op.init = () => {
    wss = null;
    serverClients = null;
    outRunning.set(false);
    outConnectedClients.set(0);
    outClientID.set("");
    outRawData.set("");
};

op.onDelete = function () {
    if (outRunning.get()) shutdownServer();
    outServerStopped.trigger();
};

inStartServer.onTriggered = () => {
    if (outRunning.get()) shutdownServer();
    else intializeServer();
};

inPort.onChange = () => {
    if (outRunning.get()) shutdownServer();
};

inBroadcastMessage.onTriggered = () => {
    serverClients.forEach(client => {
        if (client.readyState === npmWebSocket.OPEN) {
            client.send(inMessage.get());
        }
    });
};

inSendToClientID.onTriggered = () => {
    const targetClient = serverClients.get(inTargetClientID.get());
    if (targetClient && targetClient.readyState === npmWebSocket.OPEN) {
        targetClient.send(inMessage.get());
    }
};

function intializeServer() {
    serverOpts.port = inPort.get();
    wss = new npmWebSocket.Server(serverOpts);
    serverClients = new Map();

    wss.on('connection', function (socket, request) {
        console.log('A new client connected.');
        const socketClientID = CABLES.uuid();
        serverClients.set(socketClientID, socket);
        outConnectedClients.set(serverClients.size);
        outClientConnected.trigger();
        socket.send(JSON.stringify({ clientID: socketClientID }));
        outClientsArray.set(Array.from(serverClients.keys()));

        socket.on('message', function (message) {
            const messageString = new TextDecoder("utf-8").decode(message);
            outRawData.set(messageString);
            outClientID.set(socketClientID);

            try {
                const json = JSON.parse(message);
                outValidJSON.set(true);
            }
            catch (e) {
                op.log("This doesn't look like a valid JSON: ", message);
                op.setUiError("jsonvalid", "Received message was not valid JSON", 0);
                outValidJSON.set(false);
            }

            outReceivedData.trigger();
        });

        socket.on('close', function (code, reason) {
            console.log(`Client ${socketClientID} disconnected with code:', ${code}, 'and reason: ${reason}`);
            serverClients.delete(socketClientID);
            outConnectedClients.set(serverClients.size);
            outClientsArray.set(Array.from(serverClients.keys()));
            outClientDisconnected.trigger();
        });

        socket.on('error', function (error) {
            console.error('Error in client connection:', error);
        });
    });

    console.log('WebSocket server initialized on port', inPort.get());
    outRunning.set(true);
    outServerStarted.trigger();
}

function shutdownServer() {
    wss.close(() => {
        console.log('WebSocket Server has been shut down.');
    });

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.close();
        }
    });

    outConnectedClients.set(0);
    outRunning.set(false);
    outServerStopped.trigger();
}
