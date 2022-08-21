import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    email: "",
    orderId: "",
    userId: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    PuplishUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { PuplishUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

// export const selectCurrentItem = (state) => state.cart.currntItem;

export default userSlice.reducer;
