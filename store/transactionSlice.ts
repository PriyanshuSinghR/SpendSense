import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { storage } from "./storage";

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

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
      const alreadyExists = state.transactions.find(
        (item) => item.id === action.payload.id,
      );

      if (alreadyExists) {
        return;
      }

      state.transactions.unshift(action.payload);

      storage.set("transactions", JSON.stringify(state.transactions));
    },

    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;

      storage.set("transactions", JSON.stringify(state.transactions));
    },
  },
});

export const { addTransaction, setTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
