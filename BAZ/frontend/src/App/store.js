import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/adminFeature/adminSlice';
import cartReducer from '../features/cartFeature/cartSlice';
import filterReducer from '../features/filterFeature/filterSlice';
import productReducer from '../features/productFeature/productSlice';
import userReducer from '../features/userFeature/userSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
    filter: filterReducer,
    product: productReducer,
    user: userReducer,
  },
});

export default store;
