import { configureStore } from "@reduxjs/toolkit";
import MainReducer from "../reducers";

const store = configureStore({
  reducer: MainReducer,
});

export default store;
