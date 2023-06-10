import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  UPDATE_SHIPPING,
  CLEAR_SHIPPING,
} from '../actions';
import { initialState } from '../context/defaultContextValue/cartDefault';
import {
  CartActionType,
  CartContextStateType,
  CartItemAndProduct,
  CartItemType,
} from '../types';

const cart_reducer = (
  state: CartContextStateType,
  action: CartActionType
): CartContextStateType => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { productID, color, amount, product, size } =
        action.payload as CartItemAndProduct;
      // const { id, amount } = product;
      const tempItem = state.cart.find(
        (i) => i.productID === productID && i.size === size && i.color === color
      );
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (
            cartItem.productID === productID &&
            cartItem.size === size &&
            cartItem.color === color
          ) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          name: product.productName,
          color,
          amount,
          size,
          image: product.images[0],
          price: product.price,
          max: product.stock,
          productID: product.id,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    case REMOVE_CART_ITEM: {
      const temp = state.cart.filter((item) => {
        const { productID, size } = action.payload as CartItemType;
        item.productID === productID && item.size === size;
      });
      return { ...state, cart: temp };
    }
    case CLEAR_CART:
      return { ...state, cart: [] };
    case TOGGLE_CART_ITEM_AMOUNT: {
      const {
        productID: sid,
        value,
        color,
        size,
      } = action.payload as CartItemType & { value: string };
      const tempCart = state.cart.map((item) => {
        if (
          item.productID === sid &&
          item.color === color &&
          item.size === size
        ) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return { ...item };
        }
      }) as CartItemType[];
      return { ...state, cart: tempCart };
    }
    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_items, total_amount };
    }
    case UPDATE_SHIPPING: {
      const { detail, info } = action.payload as {
        detail: string;
        info: string;
      };
      return {
        ...state,
        shippingInfo: { ...state.shippingInfo, [detail]: info },
      };
    }
    case CLEAR_SHIPPING:
      return {
        ...state,
        ...initialState.shippingInfo,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
