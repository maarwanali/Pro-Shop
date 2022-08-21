import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

export const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    save: (state, action) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { save } = idSlice.actions;
export const selectID = (state) => state.id.id;

export default idSlice.reducer;
