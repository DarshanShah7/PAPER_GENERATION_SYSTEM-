import React, { Component } from "react";
import NavBar from "./Home_components/Navbar";
import Carousel1 from "./Home_components/Carousel1";
import DemoImg from "./Home_components/demo.png";
import { Button } from "react-bootstrap";
import background from "./Home_components/bck1.jpg";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "block",
            marginBottom: "30px",
            background: "lightblue",
          }}
        >
          <h1 align="center" style={{ fontSize: "80px" }}>
            Question Paper Generator
          </h1>
          <h5 align="center">
            <i>The All in one Platform for conducting Exams</i>
          </h5>
        </div>
        <div
          style={{
            height: "400px",
            width: "800px",
            display: "flex",
            margin: "auto",
            marginLeft: "300px",
          }}
        >
          <div style={{ marginRight: "40px" }}>
            <Carousel1 />
          </div>
          <div
            style={{
              backgroundColor: "lightblue",
              padding: "15px",
              borderRadius: "10px",
              margin: "auto",
            }}
          >
            <img
              src={DemoImg}
              height="210px"
              width="210px"
              style={{ borderRadius: "10px" }}
            />
            <h3 align="center">
              Take a free
              <br /> Demo
            </h3>
            <Button className="btn btn-primary">Click Here</Button>
          </div>
        </div>
        <div>
          <h1 align="center" style={{ fontSize: "50px", color: "red" }}>
            Why Choose Qpx ?
          </h1>
        </div>
      </div>
    );
  }
}

export default HomePage;
