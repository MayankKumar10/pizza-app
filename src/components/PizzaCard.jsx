import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  updateOrderTime,
  updateOrderStatus,
  resetSectionChanged,
} from "../features/pizzaSlice";

const PizzaCard = ({ order }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(order.totalTime);
  const [highlight, setHighlight] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (
          (order.status === "Order Placed" && prevTimer > 180) ||
          (order.status === "Order in Making" && prevTimer > 180) ||
          (order.status === "Order Ready" && prevTimer > 180)
        ) {
          setHighlight(true);
        }
        return prevTimer + 1;
      });

      dispatch(updateOrderTime({ orderId: order.id, time: 1 }));
    }, 1000);
  };

  useEffect(() => {
    if (order.status !== "Cancelled" && order.status !== "Order Picked") {
      startTimer();
    }

    return () => clearInterval(intervalRef.current);
  }, [dispatch, order.id, order.status]); 
  
  useEffect(() => {
    console.log("order.sectionChanged effet", order.sectionChanged);
    if (order.sectionChanged && order.status !== "Order Picked") {
      setTimer(0);
      dispatch(resetSectionChanged(order.id));
      setHighlight(false);
    }
  }, [order.sectionChanged, order.id, order.status, dispatch]);

  const handleNext = () => {
    dispatch(
      updateOrderStatus({
        orderId: order.id,
        status: getNextStatus(order.status),
      })
    );
    console.log("order.sectionChanged", order.sectionChanged);

    if (order.status !== "Order Picked") {
      dispatch(resetSectionChanged(order.id));
      setTimer(0);
      setHighlight(false);
      startTimer();
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Order Placed":
        return "Order in Making";
      case "Order in Making":
        return "Order Ready";
      case "Order Ready":
        return "Order Picked";
      default:
        return currentStatus;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className={`pizza-card ${highlight ? "red-border" : ""}`}>
      <p>Order ID: {order.id}</p>
      {order.status !== "Order Picked" && (
        <>
          <p>Timer: {formatTime(timer)}</p>
          <button onClick={handleNext}>Next</button>
        </>
      )}
    </div>
  );
};

export default PizzaCard;
