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
  }
  render() {
    if(!this.state.loggedin){
      return(<Login/>);

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
 