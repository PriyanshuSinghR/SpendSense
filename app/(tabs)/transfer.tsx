import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function TransferScreen() {
	const quickTransfers = [
		{
			name: "PayPal",
			logo: "PP",
			bg: "bg-[#ffffff]",
			text: "text-[#003087]",
		},
		{
			name: "Stripe",
			logo: "S",
			bg: "bg-[#ffffff]",
			text: "text-[#635bff]",
		},
		{
			name: "Klarna",
			logo: "K.",
			bg: "bg-[#f8c7d8]",
			text: "text-black",
		},
		{
			name: "N26",
			logo: "N26",
			bg: "bg-[#ffffff]",
			text: "text-black",
		},
	];

	const contacts = [
		{
			name: "Evelyn Smith",
			short: "ES",
			gradient: "bg-[#d9b3f3]",
		},
		{
			name: "Emily Atkinson",
			short: "EA",
			gradient: "bg-[#e8c36d]",
		},
		{
			name: "Oliver Wilson",
			short: "OW",
			gradient: "bg-[#c9b5f7]",
		},
		{
			name: "Sophie Baker",
			short: "SB",
			gradient: "bg-[#e3b7a7]",
		},
		{
			name: "Charlie William",
			short: "CW",
			gradient: "bg-[#9de4e1]",
		},
	];

	return (
		<View className="flex-1 bg-[#f4f4f4]">
			<ScrollView
				className="flex-1 px-5 pt-14"
				showsVerticalScrollIndicator={false}
			>
				<View className="flex-row items-center justify-between mb-10">
					<View className="relative">
						<Image
							source={{
								uri: "https://i.pravatar.cc/150?img=12",
							}}
							className="w-14 h-14 rounded-full"
						/>

						<View className="absolute right-0 top-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
					</View>

					<Text className="text-[30px] font-bold text-[#363636] tracking-tight">
						Transfer
					</Text>

					<Pressable className="w-11 h-11 rounded-full items-center justify-center">
						<Ionicons name="add" size={34} color="#9b6bff" />
					</Pressable>
				</View>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingRight: 20 }}
					className="mb-10"
				>
					{quickTransfers.map((item, index) => (
						<Pressable
							key={index}
							className={`w-28 h-28 rounded-[28px] ${item.bg} mr-4 items-center justify-center shadow-sm border border-[#ececec]`}
							style={{
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 6 },
								shadowOpacity: 0.06,
								shadowRadius: 10,
								elevation: 3,
							}}
						>
							<Text className={`text-[20px] font-bold ${item.text}`}>
								{item.logo}
							</Text>
						</Pressable>
					))}
				</ScrollView>

				<View className="pb-10">
					{contacts.map((item, index) => (
						<Pressable
							key={index}
							className="bg-[#fafafa] rounded-[30px] px-6 py-6 mb-5 flex-row items-center border border-[#ededed]"
						>
							<View
								className={`w-16 h-16 rounded-full ${item.gradient} items-center justify-center mr-5`}
							>
								<Text className="text-white text-[24px] font-bold">
									{item.short}
								</Text>
							</View>

							<View className="flex-1">
								<Text className="text-[17px] font-bold text-[#363636] mb-1">
									{item.name}
								</Text>

								<Text className="text-[13px] text-[#969696] tracking-wide">
									AW BANK UNI 234-46589-000
								</Text>
							</View>
						</Pressable>
					))}
				</View>
			</ScrollView>
		</View>
	);
}
