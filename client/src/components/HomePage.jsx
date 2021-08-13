import React, { Component } from "react";
import Carousel1 from "./Home_components/Carousel1";
import DemoImg from "./Home_components/demo.png";
import { Button } from "react-bootstrap";
import background from "./Home_components/bck1.jpg";
import Card from "react-bootstrap/Card";
import HeaderImg from "./Home_components/headerimg.jpg";
import Algo from "./Home_components/algo.png";
import Data from "./Home_components/data.png";
import Secure from "./Home_components/secure1.png";

import Header from "./Home_components/Header2.jpg";
import "./HomePage.css";
const styles = {
  header: {
    backgroundImage: `url(${HeaderImg})`,
    height: "60vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};
class HomePage extends Component {
  state = {};

  render() {
    return (
      <div id="homePage">
        <div style={styles.header} id="heading">
          <div style={styles.content}>
            <h1 id="header1">ExamGenix</h1>
            <h3 style={{ color: "white" }}>
              <i>All in one platform for Exams!</i>
            </h3>
          </div>
        </div>
        {/* <img src={Header} id="header" /> */}
        <div id="home">
          <div
            style={{
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <Carousel1 />
          </div>
          {/* <div
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
          </div> */}
        </div>
        <div id="ExamGenix" style={{ marginTop: "60px" }}>
          <h1 align="center" id="EQ">
            Why Choose ExamGenix ?
          </h1>
        </div>
        <center>
          <div class="feature1">
            <img src={Algo} style={{ marginRight: "10px" }} />

            <Card bg="success" class="card1">
              <Card.Header>Powered by the Genetic Algorithm</Card.Header>
              <Card.Text>
                <h5 align="left">
                  <p style={{ padding: "10px", color: "black" }}>
                    Our App sets Question Paper by applying advanced Genetic
                    Algorithm which supports constraint based random paper
                    generation. This helps to set the 'perfect' paper
                  </p>
                </h5>
              </Card.Text>
            </Card>
          </div>
          <div class="feature1">
            <Card bg="success" class="card1">
              <Card.Header>Secure Examination Environment</Card.Header>
              <Card.Text>
                <h5 align="left">
                  <p style={{ padding: "10px", color: "black" }}>
                    Using Webcam and running machine-learning algorithms helps
                    to detect any type of malpractices.They cant even copy paste
                    the question ! The admins get photos of suspicious
                    candidates
                  </p>
                </h5>
              </Card.Text>
            </Card>
            <img src={Secure} style={{ marginLeft: "10px", height: "225px" }} />
          </div>
          <div class="feature1">
            <img src={Data} style={{ marginRight: "10px", height: "225px" }} />
            <Card bg="success" class="card1">
              <Card.Header>Data Analytics and Insights</Card.Header>
              <Card.Text>
                <h5 align="left">
                  <p style={{ padding: "10px", color: "black" }}>
                    After Candidates attempt the examination, both the students
                    as well as the teachers get insights on how all the
                    candiates scored, average score and more. The admin can also
                    download the test scores of students in .xlsx format in just
                    one click !
                  </p>
                </h5>
              </Card.Text>
            </Card>
          </div>
        </center>
      </div>
    );
  }
}

export default HomePage;
