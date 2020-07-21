import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import HistoricaleChart from "./chart/historical";
class Upstox extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Upstox</Navbar.Brand>
          <span className="hidden-xs text-muted">FrontEnd Assignment</span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/"> DASHBOARD</Nav.Link>
              <Nav.Link href="/ohlc-chart">Chart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <Navbar bg="dark" variant="dark">
          <button className="d-lg-none toggle-sidebar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Navbar.Brand href="/">Upstox</Navbar.Brand>
          <span className="hidden-xs text-muted">FrontEnd Assignment</span>
        </Navbar> */}
        <BrowserRouter>
          <Row>
            {/* <Nav to="/" className="flex-sm-column" id="sidebar">
              <ListGroup className="sub-menu">
                <ListGroup.Item>
                  {" "}
                  <NavLink exact to="/">
                    DASHBOARD
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <NavLink exact to="/ohlc-chart">
                    OHLC CHART
                  </NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Nav> */}
            <Col
            //   xl={{ span: 7, offset: 3 }}
            //   lg={{ span: 8, offset: 3 }}
            //   xs={{ span: 9, offset: 3 }}
            >
              <Container>
                <div className="content">
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/ohlc-chart" component={HistoricaleChart} />
                </div>
              </Container>
            </Col>
          </Row>
        </BrowserRouter>
      </div>
    );
  }
}

export default Upstox;
