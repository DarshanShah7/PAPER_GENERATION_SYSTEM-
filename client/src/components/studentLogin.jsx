import React, { Component } from "react";
import StudentLoginImg from "../studentLogin1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Redirect,Link } from "react-router-dom";

class StudentLogin extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      test_id:'',
      test_password:'',
      redirect:false,
      loaded:false
    };
    this.onSubmit = this.onSubmit.bind(this);
    
    axios.post("http://localhost:5000/attemptedpaperlist", { user: this.props.match.params.user }).then((res) => {
      console.log("res.data")  
      
      console.log(res.data)  
      this.Papers = res.data;
      this.setState({ loaded: true});
    });

  }

  onSubmit(e) {
    e.preventDefault()
    console.log(this.state)
    const paperObject = {
      paper_id: this.state.test_id,
      password:this.state.test_password,
    };
    console.log("Hello ");
    axios.post('http://localhost:5000/validate_paper', paperObject)
        .then((res) => {
            console.log(res)
            if(res.data.success === true){                    //loginid valid
                this.setState({ redirect: true});
            }
            else{
                alert("Incorrect testid or password");
            }

        }).catch((error) => {
            console.log(error)
        })
  };

  PapersList = [
    { paper: "Data Structures and Algorithms", paperId: 1 },
    { paper: "Sensors and Automation", paperId: 2 },
    { paper: "Theory of Computation", paperId: 3 },
    {
      paper: "Vector Calculus and Partial Differential Equations",
      paperId: 4,
    },
    { paper: "Data Communication", paperId: 5 },
    { paper: "MicroProcessors Techniques", paperId: 6 },
  ]

  render() {
    return (
      <div>
      {
          this.state.loaded &&
          <div style={{display: 'flex',placeContent:"center"}}>
        {/* <center> */}
        {this.state.redirect  &&
        <Redirect to={'/student/' + this.props.match.params.user + '/paper/' + this.state.test_id }/>   
        }
        
        
        <div>
        <img
            src={StudentLoginImg}
            alt=""
            style={{ width: "250px", marginBottom: "20px" }}
          />

          <h1 style={{ marginBottom: "4px" }}>Welcome Student!</h1>
          <h6 style={{marginBottom: "20px" }}><i> Enter Test credentials to start your test.</i></h6>
          <Form style={{width:"350px"}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control value={this.state.test_id} onChange={(e)=> this.setState({test_id:e.target.value})} type="email" placeholder="Test -ID" />
              
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control value={this.state.test_password} onChange={(e)=> this.setState({test_password:e.target.value})} type="password" placeholder="Password" />
            </Form.Group>
            
            <Button onClick={this.onSubmit} variant="primary" type="submit">
              Start Test
            </Button>
          </Form>
        </div>
        <div>
          <h3 style={{marginLeft:"200px",marginTop:"70px"}}><i>Your Past Attempted Tests</i></h3>
        <Table striped bordered hover style={{width:"400px",marginTop:"20px",marginLeft:"200px"}}>
          <thead>
            <tr>
              <th style={{width:"50px"}}>Paper -ID</th>
              <th>Paper</th>
              <th></th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {this.Papers.map((Paper,index) => (
              <tr>
                <td>{1+index}</td>
                <td>
                  <b>{Paper.paper_id}</b>
                </td>
                <td>
                    <Link to={'/student/' + this.props.match.params.user + '/paper/' + Paper.paper_id + '/analysis'}>
                        <Button className="btn btn-success btn-sm m-2">Review</Button>
                    </Link>
                  {/* <button className="btn btn-success btn-sm m-2">Review</button> */}
                </td>
                {/* <td>
                  
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table></div>          
        {/* </center> */}
             
                   
      </div> 
    }
    </div>
    );
  }
}

export default StudentLogin;
