import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Customers from './components/customers';
import Header from './components/Header';
import Header2 from './components/Header2';
import Question from './components/question';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  constructor(){
    super()

    this.isloggedin = false;
  
  };

  login = () => {
    this.isloggedin = true;
    alert("login done");
  }

  logout = () => {
    this.isloggedin = false;
    alert("logged out succesfully");
  }

  loginstatus = () => {
    return this.isloggedin;
  }

  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            <Route exact path="/" >
              <Header login = {this.login} loginstatus = {this.loginstatus} />
            </Route>
            
            <Route exact path="/login" >
              <Header2  logout = {this.logout} loginstatus = {this.loginstatus} />
            </Route>
          </Switch>
          <Switch>
            {/* <Route exact path="/" >
              <Header login = {this.login} loginstatus = {this.loginstatus} />
            </Route> */}
            
            <Route exact path="/login" >
              <Question />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;