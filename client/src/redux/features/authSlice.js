import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../axiosPublic";
import axiosPrivate from "../axiosPrivate";

export const registration = createAsyncThunk(
  "auth/registration",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.post(`/register`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      toast.success("Successfully registered.");
      console.log("data.user", data.user);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.post(`/login`, jsonData);
      toast.success("Successfully logged in.");

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.post(`/logout`);
      toast.success("Successfully logged out.");

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`/password/update`, jsonData);
      toast.success("Password changed.");

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { mutationResult: { success: false }, credentials: {} },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //registration
    [registration.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [registration.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [registration.rejected]: (state, action) => {
      state.mutationResult.loading = false;
    },
    //login
    [login.pending]: (state, action) => {
      state.credentials.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.credentials.loading = false;
      state.credentials.accessToken = action.payload.accessToken;
      state.credentials.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.credentials.loading = false;
      state.credentials.error = action.payload;
    },
    //logout
    [logout.pending]: (state, action) => {
      state.credentials.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.credentials = {};
    },
    [logout.rejected]: (state, action) => {
      state.credentials.loading = false;
      state.credentials.error = action.payload;
    },
    // change password
    [changePassword.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [changePassword.rejected]: (state, action) => {
      state.mutationResult.loading = false;
    },
  },
});

export const selectMutationResult = (state) => state.auth.mutationResult;
export const selectLoggedInUser = (state) => state.auth.credentials;

export const { resetMutationResult } = authSlice.actions;

export default authSlice.reducer;
