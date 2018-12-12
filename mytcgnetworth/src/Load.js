import React, { Component } from 'react';
class Load extends Component{
  constructor(props) {
  	super(props);
  }
  render(){
  	let elements = []
  	for(let x in this.props.state.names){
  		elements.push(<option key = {x}>{this.props.state.names[x]}</option>)
  	}
  	return (
  		<div className= 'row'>
  			<div className= 'column'>
  				<select onChange={this.props.state.setlName}>
  					{elements}
  				</select>
  			</div>
  			<div className= 'column'>
  				<button onClick = {this.props.state.loadList} className='SearchButton'>Load</button>
  			</div>
  		</div>

  	)

  }

}
export default Load;