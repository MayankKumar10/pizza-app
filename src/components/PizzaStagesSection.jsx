import React from "react";
import { useSelector } from "react-redux";
import { selectOrders } from "../features/pizzaSlice";
import PizzaCard from "./PizzaCard";

const PizzaStagesSection = () => {
  const orders = useSelector(selectOrders);

  const calculateTotalTime = (order) => {
    return order.status === "Order Picked"
      ? order.totalTime
      : order.totalTime + order.timestamp;
  };

  return (
    <div className="pizza-stages-section">
      <div className="column border">
        <h3>Order Placed</h3>
        {orders
          .filter((order) => order.status === "Order Placed")
          .map((order) => (
            <PizzaCard key={order.id} order={order} />
          ))}
      </div>
      <div className="column border">
        <h3>Order in Making</h3>
        {orders
          .filter((order) => order.status === "Order in Making")
          .map((order) => (
            <PizzaCard key={order.id} order={order} />
          ))}
      </div>
      <div className="column border">
        <h3>Order Ready</h3>
        {orders
          .filter((order) => order.status === "Order Ready")
          .map((order) => (
            <PizzaCard key={order.id} order={order} />
          ))}
      </div>
      <div className="column border">
        <h3>Order Picked</h3>
        {orders
          .filter((order) => order.status === "Order Picked")
          .map((order) => (
            <PizzaCard key={order.id} order={order} />
          ))}
      </div>
    </div>
  );
};

export default PizzaStagesSection;
