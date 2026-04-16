import TransactionItem from "@/components/dashboard/TransactionItem";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function TransactionsScreen() {
	const [selectedMonth, setSelectedMonth] = useState("MAY");
	const [selectedYear, setSelectedYear] = useState("2021");
	const [showYearDropdown, setShowYearDropdown] = useState(false);

	const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
	const years = ["2021", "2022", "2023", "2024"];

	const transactions = [
		{
			merchant: "Shopping",
			amount: 29.9,
			type: "expense",
			date: "Tue 12.05.2021",
			month: "MAY",
			year: "2021",
		},
		{
			merchant: "Movie Ticket",
			amount: 9.5,
			type: "expense",
			date: "Mon 11.05.2021",
			month: "MAY",
			year: "2021",
		},
		{
			merchant: "Amazon",
			amount: 19.3,
			type: "expense",
			date: "Mon 11.05.2021",
			month: "MAY",
			year: "2021",
		},
		{
			merchant: "Udemy",
			amount: 20,
			type: "expense",
			date: "Sat 09.05.2021",
			month: "MAY",
			year: "2021",
		},
		{
			merchant: "Books",
			amount: 14,
			type: "expense",
			date: "Fri 08.05.2021",
			month: "MAY",
			year: "2021",
		},
		{
			merchant: "Spotify",
			amount: 8.99,
			type: "expense",
			date: "Mon 11.03.2021",
			month: "MAR",
			year: "2021",
		},
		{
			merchant: "Netflix",
			amount: 12.99,
			type: "expense",
			date: "Tue 15.04.2022",
			month: "APR",
			year: "2022",
		},
	];

	const filteredTransactions = useMemo(() => {
		return transactions.filter(
			(item) => item.month === selectedMonth && item.year === selectedYear,
		);
	}, [selectedMonth, selectedYear]);

	return (
		<View className="flex-1 bg-[#f5f5f5]">
			<ScrollView
				className="flex-1 px-5 pt-14"
				showsVerticalScrollIndicator={false}
			>
				<Pressable onPress={() => router.back()} className="mb-6">
					<Ionicons name="arrow-back" size={22} color="#9ca3af" />
				</Pressable>

				<View className="flex-row items-center gap-4 mb-6 z-10">
					<Text className="text-[28px] font-bold text-gray-800">
						Transactions
					</Text>

					<View className="relative ">
						<Pressable
							onPress={() => setShowYearDropdown(!showYearDropdown)}
							className="bg-white px-4 py-2.5 rounded-2xl flex-row items-center border border-gray-100 shadow-sm"
						>
							<Text className="text-sm font-semibold text-gray-800 mr-2">
								{selectedYear}
							</Text>

							<Ionicons
								name={showYearDropdown ? "chevron-up" : "chevron-down"}
								size={16}
								color="#6b7280"
							/>
						</Pressable>

						{showYearDropdown && (
							<View className="absolute top-14 right-0 bg-white rounded-2xl py-2 w-28 border border-gray-100 shadow-lg ">
								{years.map((year) => (
									<Pressable
										key={year}
										onPress={() => {
											setSelectedYear(year);
											setShowYearDropdown(false);
										}}
										className={`px-4 py-3 flex-row items-center justify-between ${
											selectedYear === year ? "bg-indigo-50" : ""
										}`}
									>
										<Text
											className={`text-sm ${
												selectedYear === year
													? "text-indigo-600 font-semibold"
													: "text-gray-700"
											}`}
										>
											{year}
										</Text>

										{selectedYear === year && (
											<Ionicons name="checkmark" size={14} color="#4f46e5" />
										)}
									</Pressable>
								))}
							</View>
						)}
					</View>
				</View>

				<View className="mb-7 z-0">
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 20 }}
					>
						{months.map((month) => (
							<Pressable
								key={month}
								onPress={() => setSelectedMonth(month)}
								className={`mr-3 px-5 py-2.5 rounded-2xl border ${
									selectedMonth === month
										? "bg-[#1f2937] border-[#1f2937]"
										: "bg-white border-gray-200"
								}`}
							>
								<Text
									className={`text-xs font-semibold tracking-wide ${
										selectedMonth === month ? "text-white" : "text-gray-500"
									}`}
								>
									{month}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>

				<View className="pb-8">
					{filteredTransactions.length > 0 ? (
						filteredTransactions.map((item, index) => (
							<TransactionItem
								key={index}
								merchant={item.merchant}
								amount={item.amount}
								type={item.type}
								date={item.date}
							/>
						))
					) : (
						<View className="bg-white rounded-3xl p-8 items-center border border-gray-100">
							<Ionicons
								name="receipt-outline"
								size={28}
								color="#9ca3af"
								style={{ marginBottom: 10 }}
							/>

							<Text className="text-gray-800 font-semibold text-sm mb-1">
								No transactions found
							</Text>

							<Text className="text-gray-400 text-xs text-center">
								Try selecting another month or year
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
