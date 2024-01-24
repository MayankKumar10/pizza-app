import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { placeOrder } from "../features/pizzaSlice";

const PizzaForm = () => {
  const dispatch = useDispatch();
  let initialState = { type: "", size: "", base: "" };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(placeOrder(formData));
    setFormData(initialState);
  };

  return (
    <div className="pizza-form">
      <h3>Place Your Pizza Order</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Pizza Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>
        <label>
          Pizza Size:
          <select
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>
        <label>
          Pizza Base:
          <select
            name="base"
            value={formData.base}
            onChange={handleInputChange}
          >
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default PizzaForm;
