import React, { Component, useEffect, useState } from "react";
import io from "socket.io-client";
const socket_io = io("http://kaboom.rksv.net/api/", {
  transports: ["websocket", "polling"],
});
const Socket = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    socket_io.on("Data", (data) => {
      console.log("watch", data);
      setData((currentData) => [...currentData, data]);
    });
  }, []);
  return (
    <div>
      <p>RealTime Data</p>
    </div>
  );
};
export default Socket;
