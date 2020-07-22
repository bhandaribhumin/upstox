import io from "socket.io-client";
var options = {
  rememberUpgrade: true,
  transports: ["websocket"],
  secure: false,
  rejectUnauthorized: false,
};
const socket_io = io("http://kaboom.rksv.net", options);
//io.set("origins", "http://kaboom.rksv.net");
function subscribeToData(cb) {
  socket_io.on("Data", (historicalData) => cb(null, historicalData));
  socket_io.emit("subscribeToData", 1000);
}
export { subscribeToData };
