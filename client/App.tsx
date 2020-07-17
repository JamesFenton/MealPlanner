import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { configureHttp } from "./services/http";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Ingredients from "./Ingredients/Ingredients";
import { Meals } from "./meals/Meals";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function() {
  configureHttp();

  return (
    <HashRouter>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ingredients" component={Ingredients} />
          <Route path="/meals" component={Meals} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </HashRouter>
  );
}
