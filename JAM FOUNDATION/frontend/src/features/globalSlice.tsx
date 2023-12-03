import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleStateType, ArticleType } from '../types';

export const fetchArticles = createAsyncThunk(
  'global/fetchArticles/',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL_DEV}/articles`
    );
    return response.data.data;
  }
);

export const fetchSingleArticle = createAsyncThunk(
  'global/fetchSingleArticle',
  async (id: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL_DEV}/articles/${id}`
    );
    return response.data.data;
  }
);
export const uploadArticle = createAsyncThunk(
  'global/uploadArticle',
  async ({ body }: { body: FormData }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/articles`,
      body
    );
    return response.data;
  }
);
export const updateArticle = createAsyncThunk(
  'global/updateArticle',
  async ({ body, id }: { body: FormData; id: string }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/articles/${id}`,
      body
    );
    return response.data;
  }
);

const initialState = {
  articles: [],
  singleArticle: {
    _id: '',
    title: '',
    titleUl: '',
    image: '',
    overview: '',
    content: [],
    author: '',
    dateCreated: '',
  },
  showModal: false,
  loading: false,
  error: '',
} as ArticleStateType;

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    displayModal: (state, action) => {
      state.showModal = action.payload;
    },
    purge: (state, action: { payload: 'singleArticle' }) => {
      state = {
        ...state,
        [action.payload]: {
          ...initialState[action.payload],
        },
      };
    },
  },
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
    builder.addCase(fetchSingleArticle.pending, (state) => {
      state.loading = true;
      state.singleArticle = initialState.singleArticle;
    });
    builder.addCase(
      fetchSingleArticle.fulfilled,
      (state, action: { payload: ArticleType }) => {
        state.loading = false;
        state.singleArticle = {
          ...initialState.singleArticle,
          ...action.payload,
        };
      }
    );
    builder.addCase(fetchSingleArticle.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
    builder.addCase(uploadArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadArticle.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadArticle.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
    builder.addCase(updateArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateArticle.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
  },
});

export const { displayModal, purge } = globalSlice.actions;
export default globalSlice.reducer;
