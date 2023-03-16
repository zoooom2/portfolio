import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  UPDATE_SHIPPING,
  CLEAR_SHIPPING,
} from '../actions';
import useLocalStorage from '../utils/customHooks/localStorage';

const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shippingInfo: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    postCode: '',
    email: '',
  },
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [localStorageValue, setLocalStorageStateValue] = useLocalStorage(
    'cart',
    []
  );
  const [localShipping, setLocalShipping] = useLocalStorage('shipping', {});
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    cart: localStorageValue,
    shippingInfo: localShipping,
  });
  const addToCart = (id, color, amount, product, size) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, product, size },
    });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const updateShipping = (detail, info) => {
    dispatch({ type: UPDATE_SHIPPING, payload: { detail, info } });
  };
  const clearShipping = () => {
    dispatch({ type: CLEAR_SHIPPING });
  };
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    setLocalStorageStateValue(state.cart);
    setLocalShipping(state.shippingInfo);
  }, [state.cart, state.shippingInfo]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
        updateShipping,
        clearShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
