import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header className="Header">
    <nav>
      <ul>
        <li><Link className ="Link" to='/'>Home</Link></li>
        <li><Link className ="Link" to='/load'>Load</Link></li>
        <li><Link className ="Link" to='/save'>Save</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header