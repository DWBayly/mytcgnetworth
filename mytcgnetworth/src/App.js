import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import {BrowserRouter as Router, Route} from 'react-router-dom';
//import Login from './routes/Login.js'
//import Main from './routes/Main.js'
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedin:false,
      suggestions:[]
    }
    this.login=this.login.bind(this);
    this.getSuggestions= this.getSuggestions.bind(this);
    this.ws = new WebSocket("ws://localhost:3001/");
    this.setSuggestions=this.setSuggestions.bind(this);
  }
  login(){
    this.setState({loggedin:!this.state.loggedin});
  }
  getSuggestions(event){
    //console.log(event.key);
    let message={};
    message.type = 'fill';
    message.str = event.target.value;
    this.ws.send(JSON.stringify(message));
  }
  setSuggestions(data){
    this.setState({suggestions:data});
  }
  render() {
    //let suggestionList = [];
    let ss = this.setSuggestions;
    this.ws.onmessage = function (event) {
      let message = JSON.parse(event.data);
      //console.log(message);
      switch(message.type){
        case 'fill':
        ss(message.data);
        break;
        default:
        break;
      }
    }
    let elements = [];
    for(let x in this.state.suggestions){
      elements.push(
        <option key = {x} value={this.state.suggestions[x]}/>
        );
    } 
    //console.log(elements);
    return (
          <div className ='Search-Container' style = {{backgroundImage:`url(${require('./images/blacklotus.jpg')})`}}>
          
            <form className ='Search-Form'>
              <label>Input cards</label>
              <br/>
              <input id='Card-Search' list ='suggestions' name = 'suggestions' type = 'text' onKeyUp ={this.getSuggestions}/>
              <datalist id = 'suggestions'>

                {elements}
              </datalist>
              <br/>
              <button>Submit</button>
            </form>
          </div>
    );
  }
}

export default App;
  