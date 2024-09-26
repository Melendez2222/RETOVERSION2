import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../components/BODY/Interfaces";
import { getCartItems } from "../utils/localStorage";

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: getCartItems(),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productExists = state.items.find(
        (item) => item.id_Product === action.payload.id_Product
      );
      if (productExists) {
        productExists.qty = (productExists.qty || 0) + 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      setCartItems(state.items);
    },
    deleteQty: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.id_Product !== action.payload
      );
      setCartItems(state.items);
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const product = state.items.find(
        (item) => item.id_Product === action.payload
      );
      if (product) {
        if (product.qty === 1) {
          state.items = state.items.filter(
            (item) => item.id_Product !== action.payload
          );
        } else {
          product.qty = (product.qty || 0) - 1;
        }
      }
      setCartItems(state.items);
    },
    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      setCartItems(state.items);
    },
  },
});

export const { addToCart, deleteQty, decreaseQty, setCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
