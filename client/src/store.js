import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./redux/features/authSlice";
import BrandReducer from "./redux/features/brandSlice";
import CategoryReducer from "./redux/features/categorySlice";
import StoreReducer from "./redux/features/storeSlice";
import ProductReducer from "./redux/features/productSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    brand: BrandReducer,
    category: CategoryReducer,
    store: StoreReducer,
    product:ProductReducer,
  },
});
