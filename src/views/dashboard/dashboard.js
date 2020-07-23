import React, { Component } from "react";
import Stock from "../chart/Stock";
import "bootstrap/dist/css/bootstrap.css";
import socketClient from "../../socket/socketClient";
import DynamicMultiSeriesChart from "../chart/Dynamic Multi Series Chart";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      kaboom: socketClient(),
      items: [],
    };
  }

  render() {
    return (
      <div>
        {/* <Socket /> */}
        <Stock />
        <DynamicMultiSeriesChart
          responseHandler={this.state.kaboom.responseHandler}
        />
      </div>
    );
    // }
  }
}
export default Dashboard;
