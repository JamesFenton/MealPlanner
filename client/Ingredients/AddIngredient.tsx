import React, { useState } from "react";
import { addIngredient } from "../services/ingredientsService";

export default function({ onIngredientAdded }) {
  const [name, setName] = useState<string>("");

  const handleSubmit = async e => {
    e.preventDefault();
    await addIngredient({ name });
    setName("");
    onIngredientAdded();
  };

  const handleNameChanged = e => {
    setName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Add Ingredient</h4>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleNameChanged}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
