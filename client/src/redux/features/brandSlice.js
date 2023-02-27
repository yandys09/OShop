import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../axiosPrivate";

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/brands`, jsonData);
      toast.success("Successfully added new brand.");
      console.log("data.brand : ", data.brand);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    mutationResult: { success: false },
  },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //add new brand
    [addBrand.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addBrand.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addBrand.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectBrandMutationResult = (state) => state.brand.mutationResult;

export const { resetMutationResult } = brandSlice.actions;

export default brandSlice.reducer;
