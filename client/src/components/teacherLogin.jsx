import React, { Component } from "react";
import { Link } from "react-router-dom";
// import QuestionPanel from "./components/questionPanel";
import Card from "react-bootstrap/Card";
import TeacherMenu from "./teacherMenu";
import axios from "axios";
import CreateTestImg from "../createtest.jpg";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import { NavDropdown } from "react-bootstrap";
// import { Form } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { FormControl } from "react-bootstrap";
class TeacherLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PapersList: "",
      loaded: false
      
    };
    this.array = []
    this.user = this.props.match.params.user
    axios.post("http://localhost:5000/paperlist", { user: this.user }).then(async(res) => {
      // console.log(res.data);
      // let array = []
      for(let i=0; i<res.data.length;i++){
        this.array.push({paper:res.data[i].paper_name, paperId : i+1})
       
      }
      
      this.setState({PapersList:this.array},()=>
        {
          console.log(this.state.PapersList)
          this.setState({loaded:true})
          
        }
        
      
      )
    });
  }

  // state = {
  //   PapersList: [
  //     { paper: "Data Structures and Algorithms", paperId: 1 },
  //     { paper: "Sensors and Automation", paperId: 2 },
  //     { paper: "Theory of Computation", paperId: 3 },
  //     {
  //       paper: "Vector Calculus and Partial Differential Equations",
  //       paperId: 4,
  //     },
  //     { paper: "Data Communication", paperId: 5 },
  //     { paper: "MicroProcessors Techniques", paperId: 6 },
  //   ],
  // };
  handleDelete = (paperid,papername) => {
    if (window.confirm("Are you sure you want to delete this Test ? ")) {
		console.log(paperid,papername)
		axios.delete('http://localhost:5000/paperdelete', { data: { name: papername } });
      const PapersList = this.state.PapersList.filter(
        (c) => c.paperId !== paperid
      );
      this.setState({ PapersList });
    }
  };
  render() {
    return (
      <div>
        { this.state.loaded && 
          <div
          className="TeacherMenu"
          style={{ display: "flex", placeContent: "center" }}
        >
          
          <div style={{ display: "grid", placeContent: "center" }}>
            <TeacherMenu
              PapersList={this.state.PapersList}
              onDelete={this.handleDelete}
              user ={this.user}
            />
          </div>
          <div style={{ margin: "10px" }}>
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" src={CreateTestImg} style={{height:'300px'}}/>
              <Card.Body>
                <Card.Title>
                  <h2>Create a New Test</h2>
                </Card.Title>
                <Card.Text>Complete the due paper setting now.</Card.Text>
                <Link to ={ "/login/" +this.user+"/new_test" }>
                  <button className="btn btn-primary">Create a New Test</button>
                </Link>
                
              </Card.Body>
            </Card>
          </div>
        </div>
  }
      </div>
    );
  }
}

export default TeacherLogin;
