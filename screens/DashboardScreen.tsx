import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import BalanceCard from "@/components/dashboard/BalanceCard";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionItem from "@/components/dashboard/TransactionItem";

export default function DashboardScreen() {
	return (
		<ScrollView className="flex-1 bg-gray-100 px-4 pt-14">
			<Text className="text-3xl font-bold text-gray-900">SpendSense</Text>

			<Text className="text-gray-500 mt-1 mb-6">Smart Expense Tracking</Text>

			<BalanceCard />

			<QuickActions />

			<View className="mt-6">
				<View className="flex-row justify-between items-center mb-3">
					<Text className="text-lg font-semibold">Recent Transactions</Text>

					<Pressable onPress={() => router.push("/transactions")}>
						<Text className="text-blue-500 font-semibold">Show All</Text>
					</Pressable>
				</View>

				{/* Only 3 transactions */}

				<TransactionItem merchant="Amazon" amount={1200} type="expense" />

				<TransactionItem merchant="Starbucks" amount={450} type="expense" />

				<TransactionItem merchant="Salary" amount={50000} type="income" />
			</View>
		</ScrollView>
	);
}
