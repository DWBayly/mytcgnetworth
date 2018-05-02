import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Home from './Home'
import { Switch, Route } from 'react-router-dom'
//import Login from './routes/Login.js'
import Save from './Save'
import Load from './Load'
//import Main from './routes/Main.js'
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedin:false,
      suggestions:[],
      cards:[],
      cardurl : 'https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/429px-Magic_card_back.jpg?version=d581d48ea4f0bfe8670c2e8a4cae3c98',
      sname:"",
      lname:"",
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
    this.saveList=this.saveList.bind(this);
    this.loadList=this.loadList.bind(this);
    this.setsName =this.setsName.bind(this);
    this.setlname = this.setlName.bind(this);
  }
  login(){
    this.setState({loggedin:!this.state.loggedin});
  }
  setsName(){


  }
  setlName(){


  }
  updateQuantity(card,newval){
    let temp = this.state.cards;
    temp[card].quantity= newval;
    this.setState({cards:temp})
  }
  saveList(){
    let message = this.state;
    message.type = "save";
    this.ws.send(JSON.string);
  }
  loadList(id){
    let message = {};
    message.type = "load";
    message.id =id;
    this.ws.send(JSON.string);
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
      <Home submitCard={this.submitCard} ws = {this.ws} getSuggestions= {this.getSuggestions} state = {this.state}/>
    return (

      <div className ='Search-Container' >
        <div className ='Search-Form'>
          <br/>
          <h1>Welcome to My TCG Networth</h1>
            <Switch>
              <Route exact path='/' render={()=>(
                <Home submitCard={this.submitCard}
                ws = {this.ws}
                getSuggestions= {this.getSuggestions}
                state = {this.state}/>
                )
              }/>
              <Route path='/load' render = {()=>(
                  <Load state={this.state}/>
                )
              }/>
              <Route path='/save' render = {()=>(
                  <Save state = {this.state}/>
                )
              } />
            </Switch>
            
      </div>
    </div>
    );
  }
}
export default App;
  