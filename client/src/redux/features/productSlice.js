import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../axiosPublic";
import axiosPrivate from "../axiosPrivate";

export const addProduct = createAsyncThunk(
  "Product/addProduct",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/Products`, formData, {
        headers: { "Content-type": "multipart/form-data; charset=utf-8" },
      });
      toast.success("Successfully added new Product.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`/athorized/products`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/products/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const productDetails = createAsyncThunk(
  "product/productDetails",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`/Products/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`/products/${id}`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      toast.success("product updated.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    mutationResult: { success: false },
    productlist: { products: [] },
    productDetails: {},
  },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
    resetProducts: (state) => {
      state.productlist.products = [];
    },
  },
  extraReducers: {
    //add new Product
    [addProduct.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addProduct.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    // get all Product list
    [getProducts.pending]: (state, action) => {
      state.productlist.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.productlist.loading = false;
      state.productlist.products = action.payload.products;
    },
    [getProducts.rejected]: (state, action) => {
      state.productlist.loading = false;
      state.productlist.error = action.payload;
    },
    //delete a Product
    [deleteProduct.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    //get Product details
    [productDetails.pending]: (state, action) => {
      state.productDetails.loading = true;
    },
    [productDetails.fulfilled]: (state, action) => {
      state.productDetails.loading = false;
      state.productDetails.product = action.payload.product;
    },
    [productDetails.rejected]: (state, action) => {
      state.productDetails.loading = false;
      state.productDetails.error = action.payload;
    },
    //update Product
    [updateProduct.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [updateProduct.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectProductMutationResult = (state) =>
  state.product.mutationResult;
export const selectAllProducts = (state) => state.product.productlist;
export const selectProductDetails = (state) => state.product.ProductDetails;
export const { resetMutationResult } = productSlice.actions;

export default productSlice.reducer;
