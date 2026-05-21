import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { storage } from "./storage";

import { Transaction } from "@/types/transaction";

interface TransactionState {
  transactions: Transaction[];
}

const storedTransactions = storage.getString("transactions");

const initialState: TransactionState = {
  transactions: storedTransactions ? JSON.parse(storedTransactions) : [],
};

const transactionSlice = createSlice({
  name: "transactions",

  initialState,

  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);

      storage.set("transactions", JSON.stringify(state.transactions));
    },

    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;

      storage.set("transactions", JSON.stringify(action.payload));
    },
  },
});

export const { addTransaction, setTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
