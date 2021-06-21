import React, { Component } from "react";
// import QuestionPanel from "./components/questionPanel";
import Card from "react-bootstrap/Card";
import TeacherMenu from "./teacherMenu";
import CreateTestImg from "../createtest.jpg";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import { NavDropdown } from "react-bootstrap";
// import { Form } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { FormControl } from "react-bootstrap";
class TeacherLogin extends Component {
  state = {
    PapersList: [
      { paper: "Data Structures and Algorithms", paperId: 1 },
      { paper: "Sensors and Automation", paperId: 2 },
      { paper: "Theory of Computation", paperId: 3 },
      {
        paper: "Vector Calculus and Partial Differential Equations",
        paperId: 4,
      },
      { paper: "Data Communication", paperId: 5 },
      { paper: "MicroProcessors Techniques", paperId: 6 },
    ],
  };
  handleDelete = (paperid) => {
    if (window.confirm("Are you sure you want to delete this Test ? ")) {
      const PapersList = this.state.PapersList.filter(
        (c) => c.paperId !== paperid
      );
      this.setState({ PapersList });
    }
  };
  render() {
    return (
      <div>
        <div
          className="TeacherMenu"
          style={{ display: "flex", placeContent: "center" }}
        >
          <div>This is left Part</div>
          <div style={{ display: "grid", placeContent: "center" }}>
            <TeacherMenu
              PapersList={this.state.PapersList}
              onDelete={this.handleDelete}
            />
          </div>
          <div style={{ margin: "30px", marginTop: "80px" }}>
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" src={CreateTestImg} />
              <Card.Body>
                <Card.Title>
                  <h2>Create a New Test</h2>
                </Card.Title>
                <Card.Text>Complete the due paper setting now.</Card.Text>
                <button className="btn btn-primary">Create a New Test</button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherLogin;
