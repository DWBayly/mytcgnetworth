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
      cards:[],
      cardurl : 'https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/429px-Magic_card_back.jpg?version=d581d48ea4f0bfe8670c2e8a4cae3c98'
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
    this.state.updateQuantity = this.updateQuantity.bind(this);
  }
  login(){
    this.setState({loggedin:!this.state.loggedin});
  }
  updateQuantity(card,newval){
    let temp = this.state.cards;
    temp[card].quantity= newval;
    this.setState({cards:temp})
  }
  getSuggestions(event){
    let message={};
    if(event.key==="Enter"){
      message.type = 'getCards'
      message.card = event.target.value;
      event.target.value = "";
    }else{
      message.type = 'fill';
    }
    message.str = event.target.value;
    this.card = event.target.value;
    this.ws.send(JSON.stringify(message));
  }
  submitCard(event){
    let message = {};
    event.target.value='';
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
    this.setState({cards:temp,cardurl:data.results[data.index].image});
  }
  remove(index){
    let temp = this.state.cards;
    temp.splice(index,1);
    this.setState({cards:temp});
  }
  changeSelection(event){
    let temp = this.state.cards;
    temp[event[0]].index = event[1]
    this.setState({cards:temp,cardurl:temp[event[0]].results[event[1]].image});
  }
  render() {
    let total = 0;
    for(let x in this.state.cards){
      total = total + this.state.cards[x].price[this.state.cards[x].index].results[0].price*this.state.cards[x].quantity;
    }
    total = total.toFixed(2);
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
    return (
          <div className ='Search-Container' >
          <div className ='Search-Form'>
          <div>
          <h1>Welcome to mytcgnetworth.com</h1>
          <br/>

          </div>
            <div>
              <label>Input cards</label>
              <br/>
              <input id='Card-Search' list ='suggestions' name = 'suggestions' type = 'text' onKeyUp ={this.getSuggestions}/>
              <datalist id = 'suggestions'>
                {elements}
              </datalist>
              <br/>
              <br/>
              <br/>
            <button className="SearchButton" onClick = {this.submitCard}>Submit</button><br/>
            
            <br/>

            Total value : $ {total} 
            <div className = "row">
              <div className = "column">
                <List className = 'CardList' cardlist = {this.state.cards} state = {this.state}/>
              </div>
              <div className ="column">
                <img className='CardImage' src = {this.state.cardurl} width ='200px' height = '285px'/>
              </div>
            </div>
            </div>
          </div>
        </div>
    );
  }
}
export default App;
  