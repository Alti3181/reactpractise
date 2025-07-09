import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Thunk to fetch top headlines with pagination
export const fetchTopHeadlines = createAsyncThunk(
  "news/fetchTopHeadlines",
  async (page = 1, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/top-headlines", {
        params: {
          country: "us",
          pageSize: 9,
          page,
        },
      });
      return { articles: res.data.articles, page };
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch top headlines.");
    }
  }
);

// Thunk for searching news
export const searchNews = createAsyncThunk(
  "news/searchNews",
  async (query, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/everything", {
        params: {
          q: query,
          pageSize: 9,
          sortBy: "publishedAt",
          language: "en",
        },
      });
      return res.data.articles;
    } catch (err) {
      return thunkAPI.rejectWithValue("Search failed.");
    }
  }
);

// Thunk for category-based filtering
export const filterNews = createAsyncThunk(
  "news/filterNews",
  async (category, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/top-headlines", {
        params: {
          country: "us",
          category,
          pageSize: 9,
        },
      });
      return res.data.articles;
    } catch (err) {
      return thunkAPI.rejectWithValue("Filter failed.");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    resetNews: (state) => {
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🟡 Headlines
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.loading = false;
        const { articles, page } = action.payload;
        state.page = page;
        if (page === 1) {
          state.articles = articles;
        } else {
          state.articles = [...state.articles, ...articles];
        }
        state.hasMore = articles.length > 0;
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔍 Search
      .addCase(searchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hasMore = false;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.page = 1;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🗂️ Filter
      .addCase(filterNews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hasMore = false;
      })
      .addCase(filterNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.page = 1;
      })
      .addCase(filterNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetNews } = newsSlice.actions;
export default newsSlice.reducer;
