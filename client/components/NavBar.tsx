import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { User, getUser, signOut } from "../services/userSessionService";

interface NavBarState {
  user: User;
}

class NavBar extends Component<{}, NavBarState> {
  state: NavBarState = { user: null };

  componentDidMount() {
    const user = getUser();
    if (user) this.setState({ user });
  }

  handleLogOut = (e) => {
    e.preventDefault();
    signOut();
    window.location.href = "/";
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to="/meals"
                className="nav-link"
                activeClassName="active"
              >
                Meals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ingredients"
                className="nav-link"
                activeClassName="active"
              >
                Ingredients
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              {this.state.user && (
                <a className="nav-link">{this.state.user.name}</a>
              )}
              {!this.state.user && (
                <NavLink
                  to="/login"
                  className="nav-link"
                  activeClassName="active"
                >
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {this.state.user && (
                <a href="#" className="nav-link" onClick={this.handleLogOut}>
                  Log Out
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
