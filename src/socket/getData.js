import openSocket from "socket.io-client";
const socket = openSocket("http://kaboom.rksv.net");
function subscribeToData(cb) {
  io.origins();
  socket.on("Data", (timestamp) => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}
export { subscribeToData };
