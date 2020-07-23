import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = []; //dataPoints.
var updateInterval = 3000;
var interval = 1;
export class Stock extends Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    this.updateChart();
    let intervalId = setInterval(this.updateChart, updateInterval);
    this.setState({ intervalId: intervalId });
  }
  async updateChart() {
    await fetch(`http://kaboom.rksv.net/api/historical?interval=${interval}`)
      .then((res) => res.json())
      .then((data) => {
        data.map((stockData) => {
          let unix_timestamp = stockData.trim().split(",")[0];
          const date = new Date(unix_timestamp.substring(0, 10) * 1000);
          let [, ...args] = stockData
            .trim()
            .split(",")
            .slice(0, -2)
            .map(Number);

          dps.push({
            x: new Date(date),
            y: args,
          });
        });
        ++interval;
      });
    if (interval > 10) {
      clearInterval(this.state.intervalId);
    }
    this.chart.render();
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  render() {
    const options = {
      animationEnabled: true,
      zoomEnabled: true,
      theme: "light2",
      exportFileName: "Kaboom Historical",
      title: {
        text: "Kaboom Historical",
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "MM-YYYY",
      },
      axisY: {
        prefix: "$",
        includeZero: false,
        title: "Price (in USD)",
      },
      data: [
        {
          type: "ohlc",
          xValueType: "dateTime",
          name: "Real Time Stock Data",
          yValueFormatString: "$###0.00",
          xValueFormatString: "MMM YYYY",
          dataPoints: dps,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default Stock;
