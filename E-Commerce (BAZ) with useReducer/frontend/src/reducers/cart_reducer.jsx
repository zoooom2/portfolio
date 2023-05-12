import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  UPDATE_SHIPPING,
  CLEAR_SHIPPING,
  SET_CART_AMOUNT,
  UPDATE_TOTAL_PRICE,
} from '../actions';

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, amount, product, size } = action.payload;
      const tempItem = state.cart.find(
        (i) => i.product === id && i.size === size
      );
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id && cartItem.size === size) {
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
          amount,
          size,
          image: product.images[0],
          price: product.price,
          max: product.stock,
          product: id,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    case REMOVE_CART_ITEM:
      const temp = state.cart.filter((item) => item.id !== action.payload.id);
      return { ...state, cart: temp };
    case CLEAR_CART:
      return { ...state, cart: [] };

    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: sid, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === sid) {
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
      });
      return { ...state, cart: tempCart };
    case SET_CART_AMOUNT:
      const tempCarts = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, amount: action.payload.value };
        } else {
          return { ...item };
        }
      });
      return { ...state, cart: tempCarts };
    case COUNT_CART_TOTALS:
      const { total_items, subtotal } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.total_items += amount;
          total.subtotal += price * amount;
          return total;
        },
        {
          total_items: 0,
          subtotal: 0,
        }
      );
      return { ...state, total_items, subtotal };
    case UPDATE_SHIPPING:
      const { detail, info } = action.payload;
      return {
        ...state,
        shippingInfo: { ...state.shippingInfo, [detail]: info },
      };
    case CLEAR_SHIPPING:
      return {
        ...state,
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
          shippingFee: 0,
        },
      };
    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        total_amount: state.subtotal + state.shippingInfo.shippingFee,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
