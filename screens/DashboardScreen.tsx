import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function DashboardScreen() {
	const transactions = [
		{
			merchant: "Shopping",
			amount: "$29.90",
			date: "Tue 12.05.2021",
		},
		{
			merchant: "Movie Ticket",
			amount: "$9.50",
			date: "Mon 11.05.2021",
		},
		{
			merchant: "Amazon",
			amount: "$19.30",
			date: "Mon 11.05.2021",
		},
		{
			merchant: "Udemy",
			amount: "$20.00",
			date: "Sat 09.05.2021",
		},
	];

	return (
		<View className="flex-1 bg-[#f4f4f4]">
			<View className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#f3dc84] opacity-90" />

			<View className="absolute left-[-90px] top-[320px] w-56 h-56 rounded-full bg-[#b8e6fb] opacity-90" />

			<ScrollView
				className="flex-1 px-5 pt-14"
				showsVerticalScrollIndicator={false}
			>
				<Text className="text-[16px] text-[#909090] mb-6 tracking-wide">
					account overview
				</Text>

				<View className="flex-row items-center mb-10">
					<View className="relative mr-5">
						<Image
							source={{
								uri: "https://i.pravatar.cc/150?img=12",
							}}
							className="w-16 h-16 rounded-full border-[3px] border-[#635bff]"
						/>

						<View className="absolute right-0 top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
					</View>

					<View>
						<Text className="text-[18px] text-[#2f2f2f] mb-1">
							Good morning
						</Text>

						<Text className="text-[24px] font-bold text-black tracking-wide">
							ANDREA
						</Text>
					</View>
				</View>

				<View className="rounded-[34px] overflow-hidden mb-12 bg-[#f7f2f3] border border-[#ececec]">
					<View className="px-6 pt-8 pb-7 bg-[#f7f2f3]">
						<Text className="text-[16px] text-[#3b3b3b] mb-5 font-medium">
							Current Balance
						</Text>

						<Text className="text-[26px] font-bold text-[#3b3b3b]">
							$12567.89
						</Text>
					</View>

					<View className="px-6 py-7 bg-[#6b5cff]">
						<Text className="text-white text-[20px] font-bold tracking-[3px] mb-3">
							3452 1235 7894 1678
						</Text>

						<Text className="text-white text-[14px] tracking-[2px] opacity-90">
							05/2025
						</Text>
					</View>
				</View>

				<View className="flex-row items-center justify-between mb-6">
					<Text className="text-[15px] font-bold tracking-wide text-[#8c8c8c] uppercase">
						Last Transactions
					</Text>

					<Pressable onPress={() => router.push("/transactions")}>
						<Text className="text-[13px] font-semibold text-[#8b6dff]">
							See all
						</Text>
					</Pressable>
				</View>

				<View className="pb-28">
					{transactions.map((item, index) => (
						<Pressable
							key={index}
							className="bg-[#fafafa] rounded-[28px] px-6 py-6 mb-5 flex-row items-center justify-between border border-[#ededed]"
						>
							<View>
								<Text className="text-[18px] font-bold text-[#363636] mb-2">
									{item.merchant}
								</Text>

								<Text className="text-[13px] text-[#969696]">{item.date}</Text>
							</View>

							<Text className="text-[18px] font-bold text-[#363636]">
								{item.amount}
							</Text>
						</Pressable>
					))}
				</View>
			</ScrollView>
		</View>
	);
}
