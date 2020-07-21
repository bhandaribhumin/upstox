import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import { parse } from "date-fns";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function OHLCChart(props) {
  const dates = [];
  const chartReference = React.createRef();

  if (!props.data || props.data.length === 0) {
    return <div></div>;
  }
  const dateSet = props.data.map((values) => {
    let unix_timestamp = values.trim().split(",")[0];
    const date = new Date(unix_timestamp.substring(0, 10) * 1000);
    let [, ...args] = values.trim().split(",").slice(0, -1);
    let obj = {
      x: date,
      y: args.slice(0, -1).map(Number),
    };
    return obj;
  });
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
      valueFormatString: "YYYY",
    },
    axisY: {
      prefix: "$",
      title: "Price (in USD)",
    },
    data: [
      {
        type: "ohlc",
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMM YYYY",
        dataPoints: dateSet,
        // dataPoints: [
        //   { x: new Date("2017-01-01"), y: [22.6, 23.55, 22.01, 22.64] },
        //   { x: new Date("2017-02-01"), y: [22.97, 24.95, 22.45, 24.68] },
        //   { x: new Date("2017-03-01"), y: [25.37, 25.8, 22.16, 23.59] },
        //   { x: new Date("2017-04-01"), y: [23.65, 24.35, 22.26, 23.34] },
        //   { x: new Date("2017-05-01"), y: [23.52, 24.31, 22.09, 22.41] },
        //   { x: new Date("2017-06-01"), y: [22.48, 24.67, 22.07, 24.26] },
        //   { x: new Date("2017-07-01"), y: [24.46, 25.11, 23.61, 24.12] },
        //   { x: new Date("2017-08-01"), y: [24.29, 25.35, 23.12, 23.89] },
        //   { x: new Date("2017-09-01"), y: [23.9, 25.64, 22.75, 25.34] },
        //   { x: new Date("2017-10-01"), y: [25.46, 27.98, 25.12, 27.39] },
        //   { x: new Date("2017-11-01"), y: [27.64, 28.72, 25.81, 28.17] },
        //   { x: new Date("2017-12-01"), y: [28.25, 30.03, 27.5, 29.52] },
        // ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default OHLCChart;
