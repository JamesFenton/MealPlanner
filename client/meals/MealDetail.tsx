import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AddMealCommand, getMeal, addMeal } from "../services/mealsService";
import { listIngredients } from "../services/ingredientsService";

export const MealDetail: React.FC = () => {
  let { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    listIngredients().then((i) => setAllIngredients(i));
    if (id)
      getMeal(id).then((m) => {
        setName(m.name);
        setIngredients(m.ingredients);
      });
  }, []);

  useEffect(() => {
    // todo only show unselected ingredients in dropdown
  }, [ingredients]);

  const setQuantity = (ingredient, quantity) => {
    const item = ingredients.find((x) => x === ingredient);
    item.quantity = quantity;
    setIngredients([...ingredients]);
  };

  const addNewIngredient = (newIngredientId) => {
    const newIngredient = allIngredients.find((i) => i._id === newIngredientId);
    if (!newIngredient) return;
    if (ingredients.find((i) => i._id === newIngredient._id)) return;
    newIngredient.quantity = 1;
    setIngredients((ingredients) => ingredients.concat(newIngredient));
  };

  const removeIngredient = (ingredient) => {
    setIngredients((ingredients) =>
      ingredients.filter((i) => i._id !== ingredient._id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const command: AddMealCommand = {
      _id: id,
      name,
      ingredients: ingredients.map(createIngredientDto),
    };
    addMeal(command).then(() => history.push("/meals"));
  };

  const createIngredientDto = (ingredient) => {
    return {
      ingredient: ingredient._id,
      quantity: ingredient.quantity,
    };
  };

  return (
    <div>
      <h5>Meal Detail</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>

          <div className="col-md-6">
            <table className="table">
              <thead>
                <tr>
                  <th>Ingredients</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      className="form-control"
                      onChange={(e) => addNewIngredient(e.target.value)}
                    >
                      <option>Add an ingredient</option>
                      {allIngredients.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                {ingredients.map((i) => (
                  <tr key={i._id}>
                    <td>{i.name}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        className="form-control form-control-sm"
                        value={i.quantity}
                        onChange={(e) =>
                          setQuantity(i, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeIngredient(i)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};
