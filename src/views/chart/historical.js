import axios from "axios";

import React, { useState, useEffect, Component } from "react";
import OHLCChart from "./OHLCChart";
class HistoricaleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historicalData: null,
    };
    this.getHistoricalData = this.getHistoricalData.bind(this);
  }
  componentDidMount() {
    this.getHistoricalData();
  }

  async getHistoricalData() {
    try {
      const [historical] = await Promise.all([
        axios.get("http://kaboom.rksv.net/api/historical"),
      ]);
      console.log(historical.data);
      this.setState({ historicalData: historical.data });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className="cards-container">
        <OHLCChart data={this.state.historicalData} />
      </div>
    );
  }
}

export default HistoricaleChart;
