import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartStateType, SingleProductType } from '../../types';

export const handlePayStack = createAsyncThunk(
  'cart/handlePayStack',
  async ({
    shippingInfo,
    cart,
    total_amount,
    subtotal,
    total_items,
  }: Pick<
    CartStateType,
    'shippingInfo' | 'cart' | 'total_amount' | 'total_items' | 'subtotal'
  >) => {
    const response = await axios.post(
      'https://baz-api.onrender.com/api/v1/order/paystack/checkout-session',
      {
        shippingInfo: { ...shippingInfo },
        orderItems: cart,
        total_amount,
        subtotal,
        total_items,
      },
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  }
);

const shippingInfoJSON = JSON.stringify({
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
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    loading: true,
    handle_paystack_error: '',
    total_items: 0,
    subtotal: 0,
    total_amount: 0,
    shippingInfo: JSON.parse(
      localStorage.getItem('shipping') || shippingInfoJSON
    ),
  } as CartStateType,
  reducers: {
    addToCart: (
      state,
      action: {
        type: string;
        payload: {
          id: string;
          amount: number;
          product: SingleProductType;
          size: string;
        };
      }
    ) => {
      const { id, amount, product, size } = action.payload;
      // console.log(action.payload);

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
          productName: product.productName,
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
      // console.log(action.payload);
      const temp = state.cart.filter(
        (item) =>
          item.productID + item.size !==
          action.payload.productID + action.payload.size
      );
      state.cart = temp;
    },
    //error
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
      state.loading = false;
    },
    updateShipping: (state, action) => {
      const { detail, info } = action.payload;
      state.shippingInfo = { ...state.shippingInfo, [detail]: info };
    },
    createShipping: (state, action) => {
      state.shippingInfo = { ...state.shippingInfo, ...action.payload };
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
      try {
        window.location.replace(action.payload);
      } catch (e) {
        window.location = action.payload;
      }
    });
    builder.addCase(handlePayStack.rejected, (state, action) => {
      state.loading = false;
      state.handle_paystack_error = action.error.message as string;
    });
  },
});

export const {
  addToCart,
  removeItem,
  toggleAmount,
  setAmount,
  clearCart,
  createShipping,
  updateCartTotal,
  countCartTotal,
  updateShipping,
  clearShipping,
} = cartSlice.actions;
export default cartSlice.reducer;
