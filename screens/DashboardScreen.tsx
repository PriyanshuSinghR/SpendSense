import { Text, View } from "react-native";

export default function DashboardScreen() {
	return (
		<View className="flex-1 bg-white items-center justify-center">
			<Text className="text-2xl font-bold">SpendSense</Text>
			<Text className="text-gray-500 mt-2">Smart Expense Tracking</Text>
		</View>
	);
}
