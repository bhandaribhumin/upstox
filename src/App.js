import React, { Component } from "react";
import Upstox from "./views/upstox";
import { subscribeToData } from "./socket/getData";

import Offlline from "./views/tooltip";
// import Socket from "./Socket";
class App extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = { online: true };
    subscribeToData((err, timestamp) => {
      console.log(timestamp);
    });
  }
  componentDidMount() {
    this.mounted = true;
    this.heartBeat();
  }
  heartBeat = () => {
    if (!this.mounted) {
      return;
    }
    const fetchInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "default",
    };
    const fetchRequest = new Request(`http://kaboom.rksv.net/api`, fetchInit);
    fetch(fetchRequest)
      .then((result) => {
        if (!this.mounted) {
          return;
        }
        if (result.ok && !this.state.online) {
          this.setState({
            online: true,
          });
        } else if (!result.ok && this.state.online) {
          this.setState({
            online: false,
          });
        }
        setTimeout(this.heartBeat.bind(this), 2000);
      })
      .catch(() => {
        if (!this.mounted) {
          return;
        }
        if (this.state.online) {
          this.setState({
            online: false,
          });
        }
        setTimeout(this.heartBeat.bind(this), 2000);
      });
  };
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { online } = this.state;
    return (
      <div>
        {online ? null : <Offlline />}
        {<Upstox onlineStatus={online} />}
      </div>
    );
  }
}

export default App;
