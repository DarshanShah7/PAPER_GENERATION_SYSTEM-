import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import DataAnalysisImg from "./data analysis.jpg";
import PlatformImg from "./platform1.jpg";
import GeneticAlgoImg from "./genetic algorithm.jpg";
import SS1 from "./ss1.jpeg";
import SS2 from "./ss2.jpeg";
import SS3 from "./ss3.jpeg";
import SS4 from "./ss4.jpeg";
class Carousel1 extends Component {
  state = {};
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block"
              src={DataAnalysisImg}
              alt="First slide"
              style={{ height: "400px", width: "800px" }}
            />
            <Carousel.Caption>
              <h3 className="primary">Real-time Data Analysis</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block "
              src={PlatformImg}
              alt="Second slide"
              style={{ height: "400px", width: "800px" }}
            />

            <Carousel.Caption>
              <h3>All in one Platform for Exams</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={GeneticAlgoImg}
              alt="Third slide"
              style={{ height: "400px", width: "800px" }}
            />

            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Carousel1;
