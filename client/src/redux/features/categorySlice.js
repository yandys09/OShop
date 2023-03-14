import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../axiosPrivate";
import { axiosPublic } from "./../axiosPublic";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/categories`, jsonData);
      toast.success("Successfully added new Category.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/categories`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/categories/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const categoryDetails = createAsyncThunk(
  "category/categoryDetails",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/categories/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`/categories/${id}`, jsonData);
      toast.success("Category Update.!");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    mutationResult: { success: false },
    categorylist: {},
    categoryDetails: {},
  },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //add new Category
    [addCategory.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addCategory.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    // get all Category list
    [getCategories.pending]: (state, action) => {
      state.categorylist.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categorylist.loading = false;
      state.categorylist.categories = action.payload.categories;
    },
    [getCategories.rejected]: (state, action) => {
      state.categorylist.loading = false;
      state.categorylist.error = action.payload;
    },
    //delete Category
    [deleteCategory.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    // get Category Details
    [categoryDetails.pending]: (state, action) => {
      state.categoryDetails.loading = true;
    },
    [categoryDetails.fulfilled]: (state, action) => {
      state.categoryDetails.loading = false;
      state.categoryDetails.category = action.payload.category;
    },
    [categoryDetails.rejected]: (state, action) => {
      state.categoryDetails.loading = false;
      state.categoryDetails.error = action.payload;
    },
    //update Category
    [updateCategory.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [updateCategory.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectCategoryMutationResult = (state) =>
  state.category.mutationResult;
export const selectAllCategories = (state) => state.category.categorylist;
export const selectCategoryDetails = (state) => state.category.categoryDetails;
export const { resetMutationResult } = categorySlice.actions;

export default categorySlice.reducer;
