import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  totlePrice: 0,
  id: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    AddOrder: (state, action) => {
      if (state.order) {
        state.order.push(action.payload);
      } else {
        state.order = [action.payload];
      }
    },

    DeleteOrder: (state) => {
      state.order = [];
    },

    GetId: (state, action) => {
      state.id = action.payload;
    },

    totlePrice: (state, action) => {
      state.totlePrice += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { AddOrder, DeleteOrder, totlePrice, GetId } = orderSlice.actions;
export const selectOrder = (state) => state.order.order;
export const selectPrice = (state) => state.order.totlePrice;

export const selectId = (state) => state.order.id;

// export const selectCurrentItem = (state) => state.cart.currntItem;

export default orderSlice.reducer;
