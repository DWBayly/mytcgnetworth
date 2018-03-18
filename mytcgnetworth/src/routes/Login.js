//modules/Repos.js
//import React from 'react'
import React, { Component } from 'react';
class Login extends Component{
  constructor(props) {
  	super(props);
  	this.handleClick=this.handleClick.bind(this);
  }
  handleClick(e){
  	console.log(e);
  	this.props.login();
  }
  render(){
  	return(<div>
  		<a onClick ={this.handleClick} >Login</a>
  		</div>
  		);
  }
}
export default Login;