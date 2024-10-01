import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemDetail, Product } from "../components/BODY/Interfaces";
import { setCartItemStorage,getCartItemsStorage } from "../utils/localStorage";
import { addCartItem, DecreaseCartItem, DeleteeCartItem } from "../services/Request";

interface CartState {
  items: Product[];
  userName: string|null;
  userPassword: string|null;
}

const initialState: CartState = {
  items: getCartItemsStorage(),
  userName: '',
  userPassword: '',
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
      setCartItemStorage(state.items);
      // Llamada HTTP
      if (state.userName && state.userPassword) {
        const cartItemDetail: CartItemDetail = {
          UserName: state.userName,
          UserPassword: state.userPassword,
          ProductId: action.payload.id_Product,
        };

        addCartItem(cartItemDetail).catch((error) => {
          console.error('Error:', error);
          alert('Error al agregar el producto al carrito');
        });
      }
    },
    deleteQty: (state, action: PayloadAction<number>) => {
      const product = state.items.find(
        (item) => item.id_Product === action.payload
      );
      if (product) {
        state.items = state.items.filter(
          (item) => item.id_Product !== action.payload
        );
        setCartItemStorage(state.items);

        // Llamada HTTP
        if (state.userName && state.userPassword) {
          const cartItemDetail: CartItemDetail = {
            UserName: state.userName,
            UserPassword: state.userPassword,
            ProductId: action.payload,
          };

          DeleteeCartItem(cartItemDetail).catch((error) => {
            console.error('Error:', error);
            alert('Error al eliminar el producto del carrito');
          });
        }
      }
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
        setCartItemStorage(state.items);

        // Llamada HTTP
        if (state.userName && state.userPassword) {
          const cartItemDetail: CartItemDetail = {
            UserName: state.userName,
            UserPassword: state.userPassword,
            ProductId: action.payload,
          };

          DecreaseCartItem(cartItemDetail).catch((error) => {
            console.error('Error:', error);
            alert('Error al decrementar la cantidad del producto en el carrito');
          });
        }
      }
    },
    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      setCartItemStorage(state.items);
    },
    setUserCredentials: (state, action: PayloadAction<{ userName: string|null; userPassword: string|null }>) => {
      state.userName = action.payload.userName;
      state.userPassword = action.payload.userPassword;
    },
    clearUserCredentials: (state) => {
      state.userName = null;
      state.userPassword = null;
    },
  },
});

export const { addToCart, deleteQty, decreaseQty, setCartItems, setUserCredentials, clearUserCredentials } =
  cartSlice.actions;
export default cartSlice.reducer;
