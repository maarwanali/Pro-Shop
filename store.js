import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./slices/IdSlice";
import cartReducer from "./slices/CartSlice";
import orderReducer from "./slices/OrderSlice";
import userReducer from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    id: idReducer,
    order: orderReducer,
    user: userReducer,
  },
});
