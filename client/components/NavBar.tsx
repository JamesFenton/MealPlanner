import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  render() { 
    return (  
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="meals" className="nav-link" activeClassName="active">Meals</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="ingredients" className="nav-link" activeClassName="active">Ingredients</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
 
export default NavBar;