import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import { parse } from "date-fns";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function OHLCChart(props) {
  const dates = [];
  const chartReference = React.createRef();
  //   const [historicalDataSet, setHistoricalDataSet] = useState(props.data);
  //   //
  //   useEffect(() => {
  //     if (props.data !== historicalDataSet) {
  //       setHistoricalDataSet(props.data);
  //       // CanvasJSChart.render();
  //     }
  //   }, [props.data]);

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
  console.log("dateSet", dateSet);
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
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default OHLCChart;
