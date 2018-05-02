import React, { Component } from 'react';
class Load extends Component{
  constructor(props) {
  	super(props);
  }
  render(){
  	return (
  		<div className= 'row'>
  			<div className= 'column'>
  				<label>Input Name</label>
  				<input type = 'text'/>
  			</div>
  			<div className= 'column'>
  				<button className='SearchButton'>Load</button>
  			</div>
  		</div>

  	)

  }

}
export default Load;