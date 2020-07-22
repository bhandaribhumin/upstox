import React, { Component } from "react";
import Stock from "../chart/Stock";
import Datatable from "react-bs-datatable";
import "bootstrap/dist/css/bootstrap.css";
import Socket from "../../Socket";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
    this.header = [
      { title: "Date", prop: "date", sortable: true, filterable: true },
      {
        title: "Stock Open",
        prop: "open",
        sortable: true,
        filterable: true,
      },
      { title: "Stock High", prop: "high", sortable: true, filterable: true },
      { title: "Stock Low", prop: "low", sortable: true, filterable: true },
      { title: "Stock Close", prop: "close", sortable: true, filterable: true },
      {
        title: "Stock Volume",
        prop: "volume",
        sortable: true,
        filterable: true,
      },
    ];
  }

  componentDidMount() {
    fetch("http://kaboom.rksv.net/api/historical")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // console.log(this.state.items);
      return (
        <div>
          <Socket />
          <Stock />
          {/* <Datatable
            tableHeader={this.header}
            tableBody={this.state.items}
            keyName="userTable"
            tableClass="striped hover responsive"
            rowsPerPage={3}
            rowsPerPageOption={[3, 5, 8, 10]}
            initialSort={{ prop: "date", isAscending: true }}
          /> */}
        </div>
      );
    }
  }
}
export default Dashboard;
