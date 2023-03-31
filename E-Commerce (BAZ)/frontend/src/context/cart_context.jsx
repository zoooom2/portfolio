import React, { useEffect, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '../actions';
import useLocalStorage from '../utils/customHooks/localStorage';
import { useUserContext } from './user_context';

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
