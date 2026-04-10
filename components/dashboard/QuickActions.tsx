import { Pressable, Text, View } from "react-native";

export default function QuickActions() {
	return (
		<View className="flex-row justify-between mt-6">
			<Pressable className="bg-white p-4 rounded-xl w-[48%] items-center shadow">
				<Text className="font-semibold">Add Expense</Text>
			</Pressable>

			<Pressable className="bg-white p-4 rounded-xl w-[48%] items-center shadow">
				<Text className="font-semibold">Add Income</Text>
			</Pressable>
		</View>
	);
}
