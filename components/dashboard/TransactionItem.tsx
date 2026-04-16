import { Text, View } from "react-native";

interface Props {
	merchant: string;
	amount: number;
	type: "income" | "expense";
	date?: string;
}

export default function TransactionItem({
	merchant,
	amount,
	type,
	date,
}: Props) {
	return (
		<View className="flex-row justify-between items-center bg-white px-5 py-4 rounded-[24px] mb-4">
			<View>
				<Text className="text-lg font-semibold text-gray-800">{merchant}</Text>

				<Text className="text-sm text-gray-400 mt-1">{date || "Today"}</Text>
			</View>

			<Text
				className={`text-xl font-bold ${
					type === "expense" ? "text-gray-800" : "text-green-600"
				}`}
			>
				${amount.toFixed(2)}
			</Text>
		</View>
	);
}
