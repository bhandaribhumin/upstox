import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var historicalData = [];
//initial values
class DynamicMultiSeriesChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      historicalData: null,
    };
    this.onDataReceived = this.onDataReceived.bind(this);
  }
  componentDidMount() {
    this.props.responseHandler(this.onDataReceived);
  }
  onDataReceived(entry) {
    console.log("onDataReceived:", entry);
  }

  render() {
    return <div>Socket Data Recive Event Emit "Data"</div>;
  }
}

export default DynamicMultiSeriesChart;
