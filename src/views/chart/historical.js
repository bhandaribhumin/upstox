import axios from "axios";

import React, { useState, useEffect } from "react";
import OHLCChart from "./OHLCChart";
function HistoricaleChart() {
  const [fetched, setFetched] = useState(false);
  const [HistoricalData, setHistoricalData] = useState([]);
  useEffect(() => {
    if (fetched === false) {
      getHistoricalData();
    }
  }, [fetched]);
  //setInterval(this.getHistoricalData, 2000);
  const getHistoricalData = async () => {
    try {
      const [historical] = await Promise.all([
        axios.get("http://kaboom.rksv.net/api/historical"),
      ]);
      setHistoricalData(historical.data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cards-container">
      <div
        className="card card-big fadeInUp"
        style={{ animationDelay: "0.7s" }}
      >
        <OHLCChart data={HistoricalData} />
      </div>
    </div>
  );
}

export default HistoricaleChart;
