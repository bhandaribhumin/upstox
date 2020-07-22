import React, { Component, useEffect, useState } from "react";
import io from "socket.io-client";
const socket_io = io("http://kaboom.rksv.net/api/", {
  transports: ["websocket", "polling"],
});
const Socket = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    socket_io.on("historical", (cpuPercent) => {
      console.log("watch", cpuPercent);
      setData((currentData) => [...currentData, cpuPercent]);
    });
  }, []);
  return (
    <div>
      Real
      <p>asd</p>
    </div>
  );
};
export default Socket;
