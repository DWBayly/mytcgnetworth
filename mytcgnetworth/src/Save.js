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
  				<input type = 'text'/>
  			</div>
  			<div className= 'column'>
  				<button className='SearchButton'>Save</button>
  			</div>
  		</div>
  	)
  }


}
export default Save;