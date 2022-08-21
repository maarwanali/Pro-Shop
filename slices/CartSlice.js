import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  products: [],
  currntItem: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.cartCount === 0) {
        let cart = {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          price: action.payload.price,
          oldPrice: action.payload.oldPrice,
          image: action.payload.image,
          quantity: 1,
        };
        state.products.push(cart);
      } else {
        let chek = false;
        state.products.map((item, key) => {
          if (item.id === action.payload.id) {
            state.products[key].quantity++;
            chek = true;
          }
        });

        if (!chek) {
          let _cart = {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            price: action.payload.price,
            oldPrice: action.payload.oldPrice,
            image: action.payload.image,
            quantity: 1,
          };
          state.products.push(_cart);
        }
      }

      state = { ...state, cartCount: state.cartCount++ };
    },

    DeleteFromCart: (state, action) => {
      const quantity = state.products[action.payload].quantity;
      state.cartCount -= quantity;
      state.products = state.products.filter(
        (item) => item.id !== state.products[action.payload].id
      );
    },

    clearCart: (state) => {
      state.products = [];
      state.cartCount = 0;
      state.currntItem = null;
    },

    IncrementQuantity: (state, action) => {
      state.cartCount++;
      state.products[action.payload].quantity++;
      state = { ...state };
    },

    DecrementQuantity: (state, action) => {
      if (state.products[action.payload].quantity > 1) {
        state.cartCount--;
        state.products[action.payload].quantity--;
      } else {
        const quantity = state.products[action.payload].quantity;
        state.cartCount -= quantity;
        state.products = state.products.filter(
          (item) => item.id !== state.products[action.payload].id
        );
      }

      state = { ...state };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  DeleteFromCart,
  clearCart,
  IncrementQuantity,
  DecrementQuantity,
} = cartSlice.actions;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectProducts = (state) => state.cart.products;

// export const selectCurrentItem = (state) => state.cart.currntItem;

export default cartSlice.reducer;
