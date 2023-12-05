import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../features/globalSlice';
import userReducer from '../features/userFeature/userSlice';

const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
