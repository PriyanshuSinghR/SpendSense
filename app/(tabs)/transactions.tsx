import TransactionItem from "@/components/dashboard/TransactionItem";
import { ScrollView, Text } from "react-native";

export default function TransactionsScreen() {
	const transactions = [
		{ merchant: "Amazon", amount: 1200, type: "expense" },
		{ merchant: "Movie Ticket", amount: 450, type: "expense" },
		{ merchant: "Spotify", amount: 199, type: "expense" },
		{ merchant: "Salary", amount: 50000, type: "income" },
		{ merchant: "Udemy", amount: 799, type: "expense" },
	];

	return (
		<ScrollView className="flex-1 bg-gray-100 px-4 pt-14">
			<Text className="text-3xl font-bold mb-6">Transactions</Text>

			{transactions.map((item, index) => (
				<TransactionItem
					key={index}
					merchant={item.merchant}
					amount={item.amount}
					type={item.type}
				/>
			))}
		</ScrollView>
	);
}
