import React, { Component, useEffect, useState } from "react";
import io from "socket.io-client";
const socket_io = io("http://kaboom.rksv.net", {
  transports: ["websocket", "polling"],
});
const Socket = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("socket loaded");
    socket_io.on("Data", (Data) => {
      console.log("watch", Data);
      setData((currentData) => [...currentData, Data]);
    });
    socket_io.on("Error", (Error) => {
      console.log("watch", Error);
      //setData((currentData) => [...currentData, Data]);
    });
  }, []);
  return (
    <div>
      <p>RealTime Data</p>
    </div>
  );
};
export default Socket;
