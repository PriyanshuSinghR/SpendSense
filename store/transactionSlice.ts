import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
	name: "transactions",
	initialState: [],
	reducers: {
		setTransactions: (state, action) => action.payload,
	},
});

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
