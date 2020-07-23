const io = require("socket.io-client");

export default function () {
  const socket = io.connect("http://kaboom.rksv.net", {
    rememberUpgrade: true,
    transports: ["websocket", "polling"],
    secure: false,
    rejectUnauthorized: false,
  });
  function responseHandler(onDataReceived) {
    socket.on("Data", onDataReceived);
  }
  socket.on("Error", function (err) {
    console.log("received socket error:");
    console.log(err);
  });
  return {
    responseHandler,
  };
}
