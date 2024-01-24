import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, selectOrders } from "../features/pizzaSlice";

const MainSection = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [totalTimer, setTotalTimer] = useState(0);

  useEffect(() => {
    const orderPickedExists = orders.some(
      (order) => order.status === "Order Picked"
    );

    if (orderPickedExists) {
      const interval = setInterval(() => {
        setTotalTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [orders]);

  const calculateTotalTime = (order) => {
    if (order.status === "Order Picked") {
      return order.totalTime;
    } else if (order.status === "Order Placed") {
      const currentTime = Math.floor(
        (new Date() - new Date(order.timestamp)) / 1000
      );
      return currentTime + order.totalTime;
    } else {
      return order.totalTime;
    }
  };

  const handleCancel = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const totalOrder = orders.filter(
    (order) => order.status === "Order Picked"
  ).length;

  return (
    <div className="main-section">
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stages</th>
            <th>Total time spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>
                {Math.floor(calculateTotalTime(order) / 60)} min{" "}
                {calculateTotalTime(order) % 60} sec
              </td>
              <td>
                {order.status === "Order Placed" && (
                  <button onClick={() => handleCancel(order.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total orders delivered: {totalOrder}</p>
    </div>
  );
};

export default MainSection;
