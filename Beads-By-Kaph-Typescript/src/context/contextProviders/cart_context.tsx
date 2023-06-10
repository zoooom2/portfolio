import {
  useEffect,
  useReducer,
  createContext,
  useCallback,
  useMemo,
} from 'react';
import axios, { AxiosError } from 'axios';
import reducer from '../../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  UPDATE_SHIPPING,
  CLEAR_SHIPPING,
} from '../../actions';
import useLocalStorage from '../../utils/customHooks/localStorage';
import {
  CartItemAndProduct,
  ChildrenProps,
  SingleProductType,
} from '../../types';
import {
  CartContextValue,
  defaultValue,
  initialState,
} from '../defaultContextValue/cartDefault';

export const CartContext = createContext<CartContextValue>(defaultValue);

export const CartProvider = ({ children }: ChildrenProps) => {
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

  const addToCart = useCallback(
    (
      productID: string,
      color: string,
      amount: number,
      product: SingleProductType,
      size: number
    ) => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          productID,
          color,
          amount,
          product,
          size,
        } as CartItemAndProduct,
      });
    },
    []
  );
  const removeItem = useCallback((productID: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { productID } });
  }, []);
  const toggleAmount = useCallback(
    (productID: string, value: string, color: string, size: number) => {
      dispatch({
        type: TOGGLE_CART_ITEM_AMOUNT,
        payload: { productID, value, color, size },
      });
    },
    []
  );
  const clearCart = useCallback(() => {
    dispatch({ type: CLEAR_CART });
  }, []);
  const updateShipping = useCallback((detail: string, info: string) => {
    dispatch({ type: UPDATE_SHIPPING, payload: { detail, info } });
  }, []);
  const clearShipping = useCallback(() => {
    dispatch({ type: CLEAR_SHIPPING });
  }, []);

  const handlePayStack = useCallback(async () => {
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError.response?.data);
      }
    }
  }, [state.cart, state.shippingInfo, state.total_amount]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handlePaypal = async () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleStripe = () => {};

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    setLocalStorageStateValue(state.cart);
    setLocalShipping(state.shippingInfo);
  }, [state.cart, state.shippingInfo]);

  const value = useMemo(
    () => ({
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
    }),
    [
      addToCart,
      clearCart,
      clearShipping,
      handlePayStack,
      removeItem,
      state,
      toggleAmount,
      updateShipping,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
