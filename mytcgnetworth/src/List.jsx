import React, { Component } from 'react';
class List extends Component{
  constructor(props) {
  	super(props);
  	this.remove = this.remove.bind(this)
  	this.changeSelected = this.changeSelected.bind(this);
  }
  remove(event){
  	this.props.state.remove(event);
  }
  changeSelected(event){
  	let ans = event.target.value.split(",");
  	ans[0]= parseInt(ans[0],10);
  	ans[1]= parseInt(ans[1],10);
  	this.props.state.changeSelection(ans);
  }
  render(){
  	let elements = [];
  	let cardlist = this.props.cardlist;
  	let re = /magic\/([^\/]*)\//
  	let rm = this.remove;
  	let cs = this.changeSelected;
  	for(let x in cardlist){
  		let list =[];
  		let temp =[];
  		for(let y in cardlist[x].results){
  			temp.push(<option key = {y} value = {[x,y]} >{cardlist[x].results[y].url.match(re)[1]} </option>);
  		}
  		elements.push(<div key = {x}>
  		<img height = "100" src = {cardlist[x].results[cardlist[x].index].image}/><br/><span >
  				<select onChange = {this.changeSelected}>
  					{temp}
  				</select>
  				${cardlist[x].price[cardlist[x].index].results[0].price}
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