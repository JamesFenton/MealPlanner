import React, { useState, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddMealCommand, getMeal } from "../services/mealsService";

export const MealDetail: React.FC = () => {
  let { id } = useParams();
  const [name, setName] = useState<string>(null);

  useEffect(() => {
    if (id) getMeal(id).then(m => setName(m.name));
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleSubmit = e => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" onChange={handleInput} />
      </div>
    </form>
  );
};
