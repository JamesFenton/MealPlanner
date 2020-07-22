import React, { useState, useEffect } from "react";
import { Meal, listMeals, deleteMeal } from "../services/mealsService";
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => listMeals().then((m) => setMeals(m));

  const deleteItem = (meal) => {
    if (!confirm(`Are you sure you want to delete ${meal.name}?`)) return;
    deleteMeal(meal._id).then(() => fetchMeals());
  };

  if (!meals) return <Spinner center />;

  return (
    <table className="container table">
      <thead>
        <tr>
          <th>Meals</th>
          <th>
            <Link to="/meals/new" className="btn btn-success btn-sm">
              New
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {meals.map((m) => (
          <tr key={m._id}>
            <td>{m.name}</td>
            <td>
              <Link to={`/meals/${m._id}`} className="btn btn-primary btn-sm">
                Edit
              </Link>
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteItem(m)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MealList;
