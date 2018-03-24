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
      suggestions:[],
      cards:[]
    }
    this.login=this.login.bind(this);
    this.getSuggestions= this.getSuggestions.bind(this);
    this.ws = new WebSocket("ws://localhost:3001/");
    this.setSuggestions=this.setSuggestions.bind(this);
    this.setCardsList = this.setCardsList.bind(this);
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
  setCardsList(data){
    this.setState({cards:data});
  }
  render() {
    //let suggestionList = [];
    let ss = this.setSuggestions;
    let scl = this.setCardsList;
    this.ws.onmessage = function (event) {
      let message = JSON.parse(event.data);
      //console.log(message);
      switch(message.type){
        case 'fill':
        ss(message.data);
        break;
        case '':

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
    let cardList = [];
    for(let x in this.state.cards){
      elements.push(
          <li>this.state.cards[x].name</li>
        );
    }
    //console.log(elements);
    return (
          <div className ='Search-Container' style = {{backgroundImage:`url(${require('./images/blacklotus.jpg')})`}}>
          <div className ='Search-Form'>
          Welcome to mytcgnetworth.com
          </div>
          <div className ='Search-Form'>
            <form >
              <label>Input cards</label>
              <br/>
              <input id='Card-Search' list ='suggestions' name = 'suggestions' type = 'text' onKeyUp ={this.getSuggestions}/>
              <datalist id = 'suggestions'>

                {elements}
              </datalist>
              <br/>
              <button>Submit</button>
            </form>

            <ul className = 'CardList'>
            cardslist
            {cardList}
            </ul>
            </div>
          </div>
    );
  }
}

export default App;
  