import { Text, View } from "react-native";

export default function BalanceCard() {
	return (
		<View className="bg-blue-600 rounded-2xl p-6">
			<Text className="text-white text-sm">Total Balance</Text>

			<Text className="text-white text-3xl font-bold mt-2">₹45,200</Text>

			<View className="flex-row justify-between mt-6">
				<View>
					<Text className="text-blue-200 text-xs">Income</Text>

					<Text className="text-white font-semibold">₹60,000</Text>
				</View>

				<View>
					<Text className="text-blue-200 text-xs">Expense</Text>

					<Text className="text-white font-semibold">₹14,800</Text>
				</View>
			</View>
		</View>
	);
}
