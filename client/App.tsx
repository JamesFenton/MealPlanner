import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { configureHttp } from "./services/http";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Ingredients from "./components/Ingredients";
import Meals from "./components/Meals";
import Login from "./auth/Login";
import Register from "./auth/Register";

class App extends Component {
  componentDidMount() {
    configureHttp();
  }

  render() {
    return (
      <HashRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ingredients" component={Ingredients} />
          <Route path="/meals" component={Meals} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
