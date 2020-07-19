import React, { useState, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddMealCommand, getMeal } from "../services/mealsService";

export const MealDetail: React.FC = () => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (id)
      getMeal(id).then(m => {
        setName(m.name);
        setIngredients(m.ingredients);
      });
  }, []);

  const handleSubmit = e => {};

  const setQuantity = (ingredient, quantity) => {
    const item = ingredients.find(x => x === ingredient);
    item.quantity = quantity;
    //setIngredients(ingredients);
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
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <table className="table">
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
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={i.quantity}
                        onChange={e => setQuantity(i, parseInt(e.target.value))}
                      />
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
