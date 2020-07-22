import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = []; //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var yOpen = 10;
var Yclose = 15;
var Ylow = 20;
var Yhigh = 30;
var updateInterval = 5000;
var count = 0;
var offset = 10;
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
    yOpen = yVal + Math.round(Math.random() * 2);
    Yclose = yVal + Math.round(Math.random() * 5);
    Ylow = yVal + Math.round(Math.random() * 6);
    Yhigh = yVal + Math.round(Math.random() * 1);
    await fetch("http://kaboom.rksv.net/api/historical")
      .then((res) => res.json())
      .then((data) => {
        let items = data.slice(count, offset).map((stockData) => {
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
        count += 10;
        offset = count + 10;
        // console.log("data", data);
      });
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
        intervalType: "month",
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
