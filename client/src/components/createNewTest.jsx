import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

class CreateNewTest extends Component {

  constructor(props){
    super(props);
    this.state = {
      test_name: '',
      subject: '',
      marks: '',
      test_id:'',
      test_password:'',
      redirect:false
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(e) {
    e.preventDefault()
    console.log(this.state)
    const paperObject = {
      paper_name : this.state.test_name,
      author:this.props.match.params.user,
      paper_id: this.state.test_id,
      password:this.state.test_password,
    };
    console.log("Hello ");
    axios.post('http://localhost:5000/create_paper', paperObject)
        .then((res) => {
            console.log(res)
            if(res.data.success === true){                    //loginid valid
                this.setState({ redirect: true});
            }
            else{
                alert("testid already exists, please enter other testid");
            }

        }).catch((error) => {
            console.log(error)
        })
  };

  render() {
    return (
      
      
      <div style={{display:"grid",placeContent:"center",paddingTop:"10%", fontFamily:"Helvetica",fontSize:"20px"}}>
        {this.state.redirect  &&
        <Redirect to={'/login/' + this.props.match.params.user + '/' + this.state.test_name + '/add_questions'}/>   
        }

        <h1><b>Enter Test details :</b></h1>
        <form action="">
        <label htmlFor="subject" style={{marginRight:"135px",marginBottom:"15px"}}>Subject:</label>
          <input type="text" id="subject" value={this.state.subject} onChange={(e)=> this.setState({subject:e.target.value})} style={{width:"400px"}}/>
          <br/>
          <label htmlFor="test-name" style={{marginRight:"100px",marginBottom:"15px"}}>Test Name :</label>
          <input type="text" id="test-name" value={this.state.test_name} onChange={(e)=> this.setState({test_name:e.target.value})} style={{marginBottom:"15px"}}/>
          <br/>
          <label htmlFor="marks" style={{marginRight:"46px"}}>Enter Total Marks:</label>
          <input type="text" id="marks" value={this.state.marks} onChange={(e)=> this.setState({marks:e.target.value})} style={{width:"50px"}} />
          <br/>
          <br/>
          <h4><b>Create Test-ID and Password:</b></h4>
          <label htmlFor="test-id" style={{marginRight:"85px",marginBottom:"15px"}}>Create Test-ID</label>
          <input type="text" id="test-id" value={this.state.test_id} onChange={(e)=> this.setState({test_id:e.target.value})} style={{width:"100px"}} />
          <br/>
          <label htmlFor="test-password" style={{marginRight:"15px",marginBottom:"15px"}}>Create Test-Password</label>
          <input type="text" id="test-password" value={this.state.test_password} onChange={(e)=> this.setState({test_password:e.target.value})} style={{width:"100px"}} />
          <br/>
          {/* <Link to ={ "/login/add_questions/newpaper" }> */}
            <button onClick={this.onSubmit} className="btn btn-primary">Create Test</button>
          {/* </Link> */}
          
        </form>
      </div>
    );
  }
}

export default CreateNewTest;
