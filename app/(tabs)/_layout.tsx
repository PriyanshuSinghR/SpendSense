import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Tabs, usePathname } from "expo-router";

export default function TabLayout() {
	const pathname = usePathname();
	const { colors } = useTheme();
	const isOverviewActive = pathname === "/" || pathname === "/transactions";

	return (
		<Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Overview",
					tabBarIcon: ({ size, color }) => (
						<Ionicons
							name="card-outline"
							size={size}
							color={isOverviewActive ? colors.primary : color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="transfer"
				options={{
					title: "Transfer",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="paper-plane-outline" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="reports"
				options={{
					title: "Reports",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="stats-chart-outline" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="transactions"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}
