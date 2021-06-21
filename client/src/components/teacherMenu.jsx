import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class TeacherMenu extends Component {
  
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
                  
                  <button className="btn btn-success btn-sm m-2">Edit</button>
                </td>
                <td>
                  
                  <button onClick={() => this.props.onDelete(Paper.paperId)} className="btn btn-danger btn-sm m-2">Delete</button>
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
