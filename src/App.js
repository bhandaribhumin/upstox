import React, { Component } from "react";
import Stock from "./Stock";
import Socket from "./Socket";
class App extends Component {
  render() {
    return (
      <div>
        <Socket />
        <Stock />
      </div>
    );
  }
}

export default App;
