import React from "react";
import MealList from "./MealList";
import { Switch, Route } from "react-router";
import { MealDetail } from "./MealDetail";

export function Meals() {
  return (
    <Switch>
      <Route path="/meals/new" component={MealDetail} />
      <Route path="/meals/:id" component={MealDetail} />
      <Route path="/meals" component={MealList} />
    </Switch>
  );
}
