import React, { Component } from 'react';
import List from './List.jsx';
class Home extends Component{
  constructor(props) {
  	super(props);
  }
  render(){
  	let total = 0;
    for(let x in this.props.state.cards){
      total = total + this.props.state.cards[x].price[this.props.state.cards[x].index].results[0].price*this.props.state.cards[x].quantity;
    }
    total = total.toFixed(2);

    let elements = [];
    for(let x in this.props.state.suggestions){
      elements.push(
        <option key = {x} value={this.props.state.suggestions[x]}/>
        );
    } 
  	return (
          <div>
            <label>Input cards</label>
            <br/>
            <input id='Card-Search' list ='suggestions' name = 'suggestions' type = 'text' onKeyUp ={this.props.getSuggestions}/>
              <datalist id = 'suggestions'>
                {elements}
              </datalist>
              <br/>
              <br/>
              <br/>
          <button className="SearchButton" onClick = {this.props.submitCard}>Submit</button><br/>
          Total value : $ {total} 
          <div className = "row">
            <div className = "column">
              <List className = 'CardList' cardlist = {this.props.state.cards} state = {this.props.state}/>
            </div>
            <div className ="column">
              <img className='CardImage' src = {this.props.state.cardurl} width ='200px' height = '285px'/>
            </div>
          </div>
        </div>


  		);
  }
}


export default Home;