# Simple single page WebRTC subscriber website
This project is a simple, self contained, single page website for creeating and initiating a subscriber client that works with the [WebRTC Signaling Server](https://github.com/JI-0/WebRTC_SignalingServer).
The page starts communicating with the server on load and immediately requests an available stream to listen to from the signaling server. If there is only one streamer streaming to the signaling server the one stream is going to be received, however, in case of multiple streams, one will be chosen at random.

## Instructions
The website can either be deployed using Apache, Nginx or any other similar web server. It can also be integrated into a larger project or framework as it only contains HTML, CSS and JS.