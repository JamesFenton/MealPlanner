import React, { useState, useEffect } from "react";
import { Meal, listMeals } from "../services/mealsService";
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>(null);

  useEffect(() => {
    listMeals().then(m => setMeals(m));
  }, []);

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
        {meals.map(i => (
          <tr key={i._id}>
            <td>{i.name}</td>
            <td>
              <Link to={`/meals/${i._id}`} className="btn btn-primary btn-sm">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MealList;
