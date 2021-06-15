import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Customers from './components/customers';
import Header from './components/Header';
import Header2 from './components/Header2';
import Question from './components/question';
import PutQuestionPaper from './components/PutQuestionPaper';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Redirect
} from "react-router-dom";
class App extends Component {
  constructor(){
    super()
    
    // this.onChangeUserName = this.onChangeUserName.bind(this);
    this.state = { isloggedin : false, username: ""}
    // console.log("hi");
  };
  
  login = (user) => {
    // console.log(user)
    this.setState({isloggedin : true, username : user});
    alert("login done");
  }

  logout = () => {
    this.setState({isloggedin : false, username: ""});
    alert("logged out succesfully");
  }

  loginstatus = () => {
    // console.log("username = " + this.state.username)
    return this.state.isloggedin;
  }

  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            <Route exact path="/" >
              <Header login = {this.login} loginstatus = {this.loginstatus}/>
            </Route>
            {/* {this.state.isloggedin ? */}
            <Route path="/login" >
              <Header2  logout = {this.logout} loginstatus = {this.loginstatus} />
            </Route>
                    {/* :<Redirect  to='/' />} */}
          </Switch>
          <Switch>
            {/* <Route exact path="/" >
              <Header login = {this.login} loginstatus = {this.loginstatus} />
            </Route> */}
            
            <Route exact path="/login" >
              {/* {this.state.isloggedin && <Question />} */}
              <Question />
            </Route>
            <Route exact path="/login/paper" >
              
              <PutQuestionPaper question = {[
                {
                    "marks": "1",
                    "difficulty": "Easy",
                    "questiontype": "Multiple-Correct",
                    "a": "a2",
                    "b": "b2",
                    "c": "c2",
                    "d": "d2",
                    "ans": {
                        "a": "true",
                        "b": "false",
                        "c": "true",
                        "d": "false"
        }
      },{
        "question": "q3",
        "marks": "1",
        "difficulty": "Easy",
        "questiontype": "Numerical",
        "ans": "a3"
    },{
        "question": "q1 The characteristics of strain gauge is defined by",
        "marks": "1",
        "difficulty": "Easy",
        "questiontype": "Single-Correct",
        "a": "Poisson’s ratio",
        "b": "Young’s modulus",
        "c": "Gauge factor",
        "d": "Change in applied temperature",
        "ans": "3"
    },{
      "question": "q2 The characteristics of strain gauge is defined by",
      "marks": "1",
      "difficulty": "Easy",
      "questiontype": "Single-Correct",
      "a": "Poisson’s ratio",
      "b": "Young’s modulus",
      "c": "Gauge factor",
      "d": "Change in applied temperature",
      "ans": "3"
  },{
    "question": "q3 The characteristics of strain gauge is defined by",
    "marks": "1",
    "difficulty": "Easy",
    "questiontype": "Single-Correct",
    "a": "Poisson’s ratio",
    "b": "Young’s modulus",
    "c": "Gauge factor",
    "d": "Change in applied temperature",
    "ans": "3"
},{
  "question": "q4 The characteristics of strain gauge is defined by",
  "marks": "1",
  "difficulty": "Easy",
  "questiontype": "Single-Correct",
  "a": "Poisson’s ratio",
  "b": "Young’s modulus",
  "c": "Gauge factor",
  "d": "Change in applied temperature",
  "ans": "3"
},{
  "question": "q5 The characteristics of strain gauge is defined by",
  "marks": "1",
  "difficulty": "Easy",
  "questiontype": "Single-Correct",
  "a": "Poisson’s ratio",
  "b": "Young’s modulus",
  "c": "Gauge factor",
  "d": "Change in applied temperature",
  "ans": "3"
}]}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
