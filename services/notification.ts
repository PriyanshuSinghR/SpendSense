import * as Notifications from "expo-notifications";

await Notifications.scheduleNotificationAsync({
	content: {
		title: "Expense Alert",
		body: "You spent ₹2000 today",
	},
	trigger: null,
});
