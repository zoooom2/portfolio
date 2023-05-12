import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  UPDATE_SHIPPING,
  CLEAR_SHIPPING,
  SET_CART_AMOUNT,
  UPDATE_TOTAL_PRICE,
} from '../actions';
import useLocalStorage from '../utils/customHooks/localStorage';

const initialState = {
  cart: [],
  total_items: 0,
  shippingFee: 0,
  subtotal: 0,
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
    shippingMethod: '',
  },
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [localStorageValue, setLocalStorageStateValue] = useLocalStorage(
    'cart',
    []
  );
  const [localShipping, setLocalShipping] = useLocalStorage('shipping', {
    ...initialState.shippingInfo,
  });
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    cart: localStorageValue,
    shippingInfo: localShipping,
  });

  const addToCart = (id, amount, product, size) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, amount, product, size },
    });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  const setAmount = (id, value) => {
    dispatch({ type: SET_CART_AMOUNT, payload: { id, value } });
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

  const handlePayStack = async () => {
    try {
      const response = await axios.post(
        '/api/v1/order/paystack/checkout-session',
        {
          shippingInfo: { ...state.shippingInfo },
          orderItems: state.cart,
          totalPrice: state.total_amount,
        },
        {
          withCredentials: true,
        }
      );
      window.location.replace(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handlePaypal = async () => {};

  const handleStripe = () => {};

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    setLocalStorageStateValue(state.cart);
    setLocalShipping(state.shippingInfo);
    dispatch({ type: UPDATE_TOTAL_PRICE });
  }, [
    state.cart,
    state.shippingInfo,
    state.subtotal,
    state.shippingInfo.shippingFee,
  ]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        setAmount,
        clearCart,
        updateShipping,
        clearShipping,
        handlePayStack,
        handlePaypal,
        handleStripe,
      }}>
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
