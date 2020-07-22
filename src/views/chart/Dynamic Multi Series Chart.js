import React, { Component } from "react";
import axios from "axios";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var historicalData = [];
var updateInterval = 5000;
//initial values
class DynamicMultiSeriesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historicalData: null,
    };
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    this.updateChart(20);
    setInterval(this.updateChart, updateInterval);
  }
  async getHistoricalData() {}
  async updateChart(count) {
    try {
      const [historical] = await Promise.all([
        axios.get("http://kaboom.rksv.net/api/historical"),
      ]);
      console.log(historical.data);
      this.setState({ historicalData: historical.data });
    } catch (err) {
      console.log(err);
    }
    this.state.historicalData.map((values) => {
      let unix_timestamp = values.trim().split(",")[0];
      const date = new Date(unix_timestamp.substring(0, 10) * 1000);
      let [, ...args] = values.trim().split(",").slice(0, -1);
      historicalData.push({
        x: date,
        y: args.slice(0, -1).map(Number),
      });
    });
  }

  render() {
    const options = {
      zoomEnabled: true,
      theme: "light2",
      title: {
        text: "Kaboom Historical",
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "YYYY",
      },
      axisY: {
        prefix: "$",
        title: "Price (in USD)",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "ohlc",
          yValueFormatString: "$###0.00",
          xValueFormatString: "MMM YYYY",
          showInLegend: true,
          name: "Live Data",
          dataPoints: historicalData,
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

export default DynamicMultiSeriesChart;
