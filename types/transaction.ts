export interface Transaction {
  id: number;
  merchant: string;
  amount: number;
  type: "income" | "expense";
  date: number;
}
