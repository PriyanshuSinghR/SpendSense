import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: TransactionState = {
	transactions: [
		{
			id: "1",
			merchant: "Amazon",
			amount: 1200,
			type: "expense",
			date: "12 May 2024",
		},
		{
			id: "2",
			merchant: "Salary",
			amount: 50000,
			type: "income",
			date: "10 May 2024",
		},
	],
};

const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		addTransaction: (state, action: PayloadAction<Transaction>) => {
			state.transactions.unshift(action.payload);
		},

		setTransactions: (state, action: PayloadAction<Transaction[]>) => {
			state.transactions = action.payload;
		},
	},
});

export const { addTransaction, setTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
