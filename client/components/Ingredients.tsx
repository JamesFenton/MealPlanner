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
      <div>
        <div className="card">
        <h5 className="card-header">Ingredients</h5>
        <table className="table">
          {this.state.ingredients.map(i => 
            <tr>
              <td>{i.name}</td>
            </tr>
            )}
        </table>
        </div>
      </div>
     );
  }
}
 
export default Ingredients;