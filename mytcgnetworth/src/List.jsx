import React, { Component } from 'react';
class List extends Component{
  constructor(props) {
  	super(props);
  	this.remove = this.remove.bind(this)
  }
  remove(event){
  	console.log(event);
  	this.props.state.remove(event);
  }
  render(){
  	let elements = [];
  	let cardlist = this.props.cardlist;
  	let re = /magic\/([^\/]*)\//
  	let rm = this.remove;
  	for(let x in cardlist){
  		let list =[];
  		let temp =[];
  		for(let y in cardlist[x].results){
  			temp.push(<option key = {y} value = {cardlist[x].results[y].url.match(re)[1]} >{cardlist[x].results[y].url.match(re)[1]} </option>);
  		}
  		elements.push(<div key = {x}>
  		<img height = "100" src = {cardlist[x].results[0].image}/><br/><span >
  				<select>
  					{temp}
  				</select>
  				${cardlist[x].price.results[0].price}
  				<button onClick = {(function(){rm(x)})}>X</button>
  			</span></div>);

  	}
  	return(
  		<div>
  			{elements}
  		</div>
  		);
  }
}
export default List;