import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar"; 
import Home from "./components/Home";
import Ingredients from "./components/Ingredients";
import Meals from "./components/Meals";

class App extends Component {
  render() { 
    return (
      <HashRouter>
          <NavBar />
          <Switch>
            <Route path="/ingredients" component={Ingredients} />
            <Route path="/meals" component={Meals} />
            <Route path="/" component={Home} />
          </Switch>
        </HashRouter>
     );
  }
}
 
export default App;