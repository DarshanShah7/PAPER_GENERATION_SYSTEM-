import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
class TeacherMenu extends Component {
  constructor(props){
    super(props)
    console.log("hi")
    this.state = {
      redirect_flag:false
    }
    console.log(this.props)
  }
  
  render() {
    return (
      <div>
        <h2 align="center" style={{marginTop:"10px"}}>Saved Tests :</h2>
        <i><h6 align="center" style={{marginTop:"5px"}}>You currently have {(this.props.PapersList.length === 0)?'no':this.props.PapersList.length} papers</h6></i>
        <Table striped bordered hover style={{width:"800px",marginTop:"20px"}}>
          <thead>
            <tr>
              <th style={{width:"100px"}}>Paper -ID</th>
              <th>Paper</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.PapersList.map((Paper) => (
              <tr>
                <td>{Paper.paperId}</td>
                <td>
                  <b>{Paper.paper}</b>
                </td>
                <td>
                  <Link to ={ "/login/edit/" + Paper.paper }>
                  <button className="btn btn-success btn-sm m-2">Edit</button>
                  </Link>
                  {/* <button onClick = {()=> this.setState({redirect_flag:true})} className="btn btn-success btn-sm m-2">Edit</button> */}
                </td>
                <td>
                  {console.log(Paper.paperId,Paper.paper)}
                  <button onClick={() => this.props.onDelete(Paper.paperId,Paper.paper)} className="btn btn-danger btn-sm m-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TeacherMenu;
