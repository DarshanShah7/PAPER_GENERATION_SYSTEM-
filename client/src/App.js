import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Customers from './components/customers';
import Header from './components/Header';
import Header2 from './components/Header2';
import Question from './components/question';
import PutQuestionPaper from './components/PutQuestionPaper';
import CreateNewTest from './components/createNewTest';
import Editqp from './components/Editqp';
import TeacherLogin from './components/teacherLogin';
import StudentLogin from './components/studentLogin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
class App extends Component {
  constructor() {
    super()

    // this.onChangeUserName = this.onChangeUserName.bind(this);
    this.state = { isloggedin: false, username: "" }
    // console.log("hi");
  };

  login = (user) => {
    // console.log(user)
    this.setState({ isloggedin: true, username: user });
    alert("login done");
  }

  logout = () => {
    this.setState({ isloggedin: false, username: "" });
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
              <Header login={this.login} loginstatus={this.loginstatus} />
            </Route>
            {/* {this.state.isloggedin ? */}
            <Route path="/login/:user" >
              <Header2 logout={this.logout} loginstatus={this.loginstatus} />
            </Route>
            {/* // :<Redirect  to='/' />} */}
          </Switch>
          <Switch>
            {/* <Route exact path="/" >
              <Header login = {this.login} loginstatus = {this.loginstatus} />
            </Route> */}

            {/* <Route exact path="/login/create" > */}
            {/* {this.state.isloggedin && <Question />} */}
            {/* <Question paper_name={"paper1"}/> */}
            {/* </Route> */}
            {/* <Route exact path="/login/paper" >

              <PutQuestionPaper />
            </Route> */}
            <Route exact path="/student/:user/paper/:paper_id" component={PutQuestionPaper} >
            </Route>

            <Route exact path="/student/:user" component={StudentLogin} >
            </Route>


            <Route exact path="/login/:user" component={TeacherLogin}>
              {/* {this.state.isloggedin && <Question />} */}

            </Route>



            <Route exact path="/login/:user/:id/add_questions" component={Question}>
            </Route>
            <Route exact path="/login/:user/new_test" component={CreateNewTest}>
            </Route>
            <Route exact path="/login/:user/:id/edit" component={Editqp}>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
