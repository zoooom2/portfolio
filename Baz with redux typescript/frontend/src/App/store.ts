import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/adminFeature/adminSlice';
import cartReducer from '../features/cartFeature/cartSlice';
import filterReducer from '../features/filterFeature/filterSlice';
import productReducer from '../features/productFeature/productSlice';
import userReducer from '../features/userFeature/userSlice';
import orderReducer from '../features/orderFeature/orderSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
    filter: filterReducer,
    product: productReducer,
    user: userReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
