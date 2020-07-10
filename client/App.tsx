import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; 
import Home from "./components/Home";
import Ingredients from "./components/Ingredients";
import Meals from "./components/Meals";
import Login from "./auth/Login";
import Register from "./auth/Register";
import axios from "axios";
import {getAccessToken} from "./services/userSessionService";

class App extends Component {

  componentDidMount() {
    axios.interceptors.request.use(config => {
      const accessToken = getAccessToken();
      if (accessToken)
        config.headers["Authorization"] = "Bearer " + accessToken;
      return config;
    })
  }

  render() { 
    return (
      <HashRouter>
          <NavBar />
          <Switch>
            <Route path="/ingredients" component={Ingredients} />
            <Route path="/meals" component={Meals} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </HashRouter>
     );
  }
}
 
export default App;