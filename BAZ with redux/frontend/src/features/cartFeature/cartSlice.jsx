import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const handlePayStack = createAsyncThunk(
  'cart/handlePayStack',
  async ([shippingInfo, cart, total_amount]) => {
    const response = await axios.post(
      '/api/v1/order/paystack/checkout-session',
      {
        shippingInfo: { ...shippingInfo },
        orderItems: cart,
        totalPrice: total_amount,
      },
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    loading: true,
    handle_paystack_error: '',
    total_items: 0,
    subtotal: 0,
    total_amount: 0,
    shippingInfo: JSON.parse(localStorage.getItem('shipping')) || {
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
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, amount, product, size } = action.payload;

      const tempItem = state.cart.find(
        (i) => i.productID === id && i.size === size
      );

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.productID === id && cartItem.size === size) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        state.cart = tempCart;
      } else {
        const newItem = {
          name: product.productName,
          amount,
          size,
          image: product.images[0],
          price: product.price,
          max: product.stock,
          productID: id,
        };
        state.cart.push(newItem);
        // state.cart = [...state.cart, newItem];
      }
    },
    removeItem: (state, action) => {
      console.log(action.payload);
      const temp = state.cart.filter(
        (item) =>
          item.productID + item.size !==
          action.payload.productID + action.payload.size
      );
      state.cart = temp;
    },
    toggleAmount: (state, action) => {
      const temp = state.cart.filter(
        (item) => item.productID !== action.payload.id
      );
      state.cart = temp;
    },
    setAmount: (state, action) => {
      const tempCarts = state.cart.map((item) => {
        if (
          item.productID === action.payload.id &&
          item.size === action.payload.size
        ) {
          return { ...item, amount: action.payload.value };
        } else {
          return { ...item };
        }
      });
      state.cart = tempCarts;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    countCartTotal: (state) => {
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
      // return { ...state, total_items, subtotal };
      state.total_items = total_items;
      state.subtotal = subtotal;
    },
    updateShipping: (state, action) => {
      const { detail, info } = action.payload;
      state.shippingInfo = { ...state.shippingInfo, [detail]: info };
    },
    clearShipping: (state) => {
      state.shippingInfo = {
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
      };
    },
    updateCartTotal: (state) => {
      state.total_amount = state.subtotal + state.shippingInfo.shippingFee;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handlePayStack.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handlePayStack.fulfilled, (state, action) => {
      state.loading = false;
      state.handle_paystack_error = '';
      window.location.replace(action.payload);
    });
    builder.addCase(handlePayStack.rejected, (state, action) => {
      state.loading = false;
      state.handle_paystack_error = action.error.message;
    });
  },
});

export const {
  addToCart,
  removeItem,
  toggleAmount,
  setAmount,
  clearCart,
  updateCartTotal,
  countCartTotal,
  updateShipping,
  clearShipping,
} = cartSlice.actions;
export default cartSlice.reducer;
