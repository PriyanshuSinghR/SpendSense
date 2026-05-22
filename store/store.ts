import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./transactionSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
