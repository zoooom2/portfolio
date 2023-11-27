import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleStateType, ArticleType } from '../types';

export const fetchArticles = createAsyncThunk(
  'global/fetchArticles/',
  async () => {
    const response = await axios.get(
      'https://jam-foundation.onrender.com/api/v1/articles/'
    );
    return response.data.data;
  }
);

const initialState = {
  articles: [],
  loading: false,
  error: '',
} as ArticleStateType;

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
      state.articles = [];
    });
    builder.addCase(
      fetchArticles.fulfilled,
      (state, action: { payload: ArticleType[] }) => {
        state.loading = false;
        state.articles = [...action.payload];
      }
    );
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
  },
});

// export const {} = GlobalSlice.actions;
export default GlobalSlice.reducer;
