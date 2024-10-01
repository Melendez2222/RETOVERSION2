import { AppDispatch, RootState } from "./../Redux/Store";
import { cartApi, useAddCartItemMutation, useDecreaseCartItemMutation } from "./../RTK/cartApi";
import { addToCart, decreaseQty } from "./../Redux/cartSlice";
import { CartItemDetail, Product } from "../components/BODY/Interfaces";

export const addToCartF = (product: Product) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { userName, userPassword } = state.cart;
  
    if (!userName || !userPassword) {
      throw new Error('User credentials are missing');
    }
  
    const cartItemDetail: CartItemDetail = {
      UserName: userName,
      UserPassword: userPassword,
      ProductId: product.id_Product,
    };
  
    try {
      const result = await dispatch(cartApi.endpoints.addCartItem.initiate(cartItemDetail));
      if (result.error) {
        throw new Error('Failed to add item to cart');
      }
      dispatch(addToCart(product));
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };
  
  export const decreaseQtyF = (productId: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { userName, userPassword } = state.cart;
  
    if (!userName || !userPassword) {
      throw new Error('User credentials are missing');
    }
  
    const cartItemDetail: CartItemDetail = {
      UserName: userName,
      UserPassword: userPassword,
      ProductId: productId,
    };
  
    try {
      const result = await dispatch(cartApi.endpoints.decreaseCartItem.initiate(cartItemDetail));
      if (result.error) {
        throw new Error('Failed to decrease item quantity');
      }
      dispatch(decreaseQty(productId));
    } catch (error) {
      console.error('Failed to decrease item quantity:', error);
    }
  };