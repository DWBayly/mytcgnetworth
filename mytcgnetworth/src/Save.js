import React, { Component } from 'react';
class Save extends Component{
	  constructor(props) {
  	super(props);
  }
  render(){
  	return(
  		<div className= 'row'>
  			<div className= 'column'>
  				<label>Input Name</label>
  				<input type = 'text' onChange = {this.props.state.setsName}/>
  			</div>
  			<div className= 'column'>
  				<button className='SearchButton' onClick={this.props.state.saveList}>Save</button>
  			</div>
  		</div>
  	)
  }


}
export default Save;