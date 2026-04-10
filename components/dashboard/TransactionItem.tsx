import { Text, View } from "react-native";

interface Props {
	merchant: string;
	amount: number;
	type: "income" | "expense";
}

export default function TransactionItem({ merchant, amount, type }: Props) {
	return (
		<View className="flex-row justify-between bg-white p-4 rounded-xl mb-3">
			<View>
				<Text className="font-semibold">{merchant}</Text>

				<Text className="text-gray-400 text-xs">Today</Text>
			</View>

			<Text
				className={`font-semibold ${
					type === "expense" ? "text-red-500" : "text-green-600"
				}`}
			>
				{type === "expense" ? "-" : "+"}₹{amount}
			</Text>
		</View>
	);
}
