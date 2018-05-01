import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import {BrowserRouter as Router, Route} from 'react-router-dom';
//import Login from './routes/Login.js'
import List from './List.jsx';
//import Main from './routes/Main.js'
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedin:false,
      suggestions:[],
      cards:[]
    }
    this.card = '';
    this.login=this.login.bind(this);
    this.getSuggestions= this.getSuggestions.bind(this);
    this.ws = new WebSocket("ws://localhost:3001/");
    this.setSuggestions=this.setSuggestions.bind(this);
    this.setCardsList = this.setCardsList.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.state.remove = this.remove.bind(this);
    this.state.changeSelection = this.changeSelection.bind(this);
  }
  login(){
    this.setState({loggedin:!this.state.loggedin});
  }
  getSuggestions(event){
    
    let message={};
    message.type = 'fill';
    message.str = event.target.value;
    this.card = event.target.value;
    this.ws.send(JSON.stringify(message));
  }
  submitCard(event){
    let message = {};
    message.type = 'getCards';
    message.card = this.card;
    this.ws.send(JSON.stringify(message));
  }
  setSuggestions(data){
    this.setState({suggestions:data});
  }
  setCardsList(data){
    let temp = this.state.cards;
    temp.push(data);
    this.setState({cards:temp});
  }
  remove(index){
    let temp = this.state.cards;
    temp.splice(index,1);
    this.setState({cards:temp});
  }
  changeSelection(event){
    let temp = this.state.cards;
    temp[event[0]].index = event[1]
    this.setState({cards:temp});
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
        case 'getCards':
          scl(message.data);
        break;
        case 'getPrice':

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
    console.log(this.state.cards);
    return (
          <div className ='Search-Container' style = {{backgroundImage:`url(${require('./images/blacklotus.jpg')})`}}>
          <div className ='Search-Form'>
          Welcome to mytcgnetworth.com
          </div>
          <div className ='Search-Form'>
              <label>Input cards</label>
              <br/>
              <input id='Card-Search' list ='suggestions' name = 'suggestions' type = 'text' onKeyUp ={this.getSuggestions}/>
              <datalist id = 'suggestions'>
                {elements}
              </datalist>
              
              <br/>
              <br/>
              <br/>
            <button onClick = {this.submitCard}>Submit</button>
            <ul className = 'CardList'>
            <List cardlist = {this.state.cards} state = {this.state}/>
            </ul>
            </div>
          </div>
    );
  }
}
export default App;
  