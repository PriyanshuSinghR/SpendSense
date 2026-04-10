export interface Transaction {
	id: string;
	amount: number;
	merchant: string;
	type: "expense" | "income";
	date: string;
	category?: string;
}
