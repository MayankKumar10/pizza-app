import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    orders: [],
  },
  reducers: {
    placeOrder: (state, action) => {
      const { type, size, base } = action.payload;
      if (state.orders.length < 10) {
        const order = {
          id: state.orders.length + 1,
          type,
          size,
          base,
          status: "Order Placed",
          timestamp: new Date().toLocaleString(), // Store timestamp as a number
          totalTime: 0,
          sectionChanged: false,
        };
        state.orders.push(order);
      }
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        order.sectionChanged = true; // Set sectionChanged to true when status changes
      }
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((o) => o.id !== orderId);
    },
    updateOrderTime: (state, action) => {
      const { orderId, time } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.totalTime += time;
      }
    },
    resetSectionChanged: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.sectionChanged = false;
      }
    },
  },
});

export const {
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  updateOrderTime,
  resetSectionChanged, // New action to reset sectionChanged
} = pizzaSlice.actions;

export const selectOrders = (state) => state.pizza.orders;

export default pizzaSlice.reducer;
