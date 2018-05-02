import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

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
  	let re = /magic\/([^\/]*)/
  	let uq = this.props.state.updateQuantity;
  	let rm = this.props.state.remove;
  	for(let x = cardlist.length-1;x>=0;x--){
  		let temp =[];
  		for(let y in cardlist[x].results){
  			temp.push(<option key = {y} value = {[x,y]} >{cardlist[x].results[y].url.match(re)[1]} </option>);
  		}
  		elements.push(
  		<tr key = {x}>
  			<td>{cardlist[x].results[cardlist[x].index].productName}</td>
  			<td>
  			<input style = {{width:"30px"}} type='number' onChange = {function(event){uq(x,event.target.value)}} default = {cardlist[x].quantity} min = '0'/>
  			</td>
  			<td>${cardlist[x].price[cardlist[x].index].results[0].price.toFixed(2)}</td>
  			<td>
  			<select onChange = {this.changeSelected}>
  			{temp}
  			</select>
  			</td>
  			<td><button className="CloseButton" onClick={function(){rm(x)}}>X</button></td>
  		</tr>
  		);
  	}
  	return(
  		<div className ='CardList'>
  			<Table condensed>
  				<thead>
	  				<tr>
		  				<th>Name</th>
		  				<th>Quantity</th>
		  				<th>Price</th>
		  				<th>Edition</th>
		  				<th></th>
	  				</tr>
  				</thead>
  				<tbody>
  					{elements}
  				</tbody>
  			</Table>
  		</div>
  		);
  }
}
export default List;

//<img height = "100" src = {cardlist[x].results[cardlist[x].index].image}/><br/>