import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Customers from './components/customers';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
      </div>
    );
  }
}

export default App;
