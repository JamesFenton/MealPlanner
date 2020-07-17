import React, { useState, useEffect } from "react";
import {
  listIngredients,
  Ingredient,
  deleteIngredient
} from "../services/ingredientsService";
import AddIngredient from "./AddIngredient";

export default function() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const getData = () => listIngredients().then(x => setIngredients(x));
  const deleteItem = (item: Ingredient) => {
    if (!confirm(`Are you sure you want to delete ${item.name}`)) return;
    deleteIngredient(item._id).then(getData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-9">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Ingredients</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(i => (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteItem(i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-3">
        <AddIngredient onIngredientAdded={getData} />
      </div>
    </div>
  );
}
