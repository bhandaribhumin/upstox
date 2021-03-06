import React, { Component, useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://kaboom.rksv.net";
const options = {
  rememberUpgrade: true,
  transports: ["websocket", "polling"],
  secure: false,
  rejectUnauthorized: false,
};
const socket_io = io(ENDPOINT, options);
function registerHandler(onMessageReceived) {
  socket_io.on("Data", onMessageReceived);
}
const Socket = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    socket_io.emit("Data", (datas) => {
      console.log("datas", datas);
    });
    socket_io.on("Data", (Data) => {
      console.log("watch", Data);

      setData((currentData) => [...currentData, Data]);
    });
  }, []);

  return (
    <div>
      Socket Data
      {data}
    </div>
  );
};
export default Socket;
