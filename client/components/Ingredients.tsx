import React, { Component } from 'react';
import {listIngredients, Ingredient} from "../services/ingredientsService";

interface IngredientsState {
  ingredients: Ingredient[];
}

class Ingredients extends Component<{}, IngredientsState> {
  constructor(props) {
    super(props);
    this.state= { ingredients: [] }
  }

  componentDidMount() {
    listIngredients().then(x => this.setState({ingredients: x}));
  }

  render() { 
    return ( 
      <div className="container">
        <table className="table">
          <thead>
          <tr>
            <th>Ingredients</th>
          </tr>
          </thead>
          <tbody>
          {this.state.ingredients.map(i => 
            <tr key={i._id}>
              <td>{i.name}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
     );
  }
}
 
export default Ingredients;