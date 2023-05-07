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


function processOffer(id, offer) {
    streamer_id = id;
    peerConnection = new RTCPeerConnection(RTCConfig);
    peerConnection
    .setRemoteDescription(offer)
    .then(() => peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
        websocket.send("A\n" + streamer_id + "\n" + JSON.stringify(peerConnection.localDescription));
    });

    //Stream
    peerConnection.ontrack = e => {
        video.srcObject = e.streams[0];
    };

    //Candidate
    peerConnection.onicecandidate = e => {
        if (e.candidate) {
            websocket.send("C\n" + streamer_id + "\n" + JSON.stringify(e.candidate));
        };
    };
}


function processCandidate(_, candidate) {
    peerConnection
    .addIceCandidate(new RTCIceCandidate(candidate))
    .catch(e => console.error(e));
};

window.onunload = window.onbeforeunload = () => {
    peerConnection.close();
    websocket.close();
};