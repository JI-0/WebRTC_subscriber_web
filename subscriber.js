'use strict';

const uri = "ws://localhost:3000";
var streamer_id = ""

//Socket/setup
const websocket = new WebSocket(uri);
const video = document.querySelector("video");

//WebRTC
let peerConnection;
const RTCConfig = {
    iceServers: [
        {
            "urls": "stun:stun.l.google.com:19302",
        }
    ]
};



//Websocket
websocket.onopen = () => {
    websocket.send("R\n" + "0");
};

websocket.onclose = () => {
};

websocket.onmessage = e => {
    let parts = e.data.split("\n", 5);
    if (parts[0] == "O") {
        processOffer(parts[1], JSON.parse(parts[2]));
    } else if (parts[0] == "C") {
        processCandidate(parts[1], JSON.parse(parts[2]));
    };
};


