import * as Notifications from "expo-notifications";

export async function sendExpenseAlert(amount: number) {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Expense Alert",
			body: `You spent ₹${amount} today`,
		},
		trigger: null,
	});
}
