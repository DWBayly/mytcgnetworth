import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './routes/Login.js'
import Main from './routes/Main.js'
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedin:false
    }
    this.login=this.login.bind(this);
    this.ws = new WebSocket("ws://localhost:3001/");
  }
  login(){
    this.setState({loggedin:!this.state.loggedin});
  }
  render() {
    this.ws.onmessage = function (event) {
      let message = JSON.parse(event.data);
      console.log(message);
    }
    if(!this.state.loggedin){
      return(<Login state={this.state} login = {this.login} />);
    }else{
      return (
        <Router>
          <div className="App">
          <li><Link to="/main">Main</Link></li>
          <Route path="/main" render={<Main/>} />
          </div>
        </Router>
      );
    }
  }
}

export default App;
 