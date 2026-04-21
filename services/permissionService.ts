import { PermissionsAndroid, Platform } from "react-native";

export async function requestSmsPermission() {
	if (Platform.OS !== "android") {
		return false;
	}

	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_SMS,
			{
				title: "SMS Permission",
				message:
					"SpendSense needs access to your SMS to detect bank transactions automatically.",
				buttonPositive: "Allow",
				buttonNegative: "Deny",
			},
		);

		return granted === PermissionsAndroid.RESULTS.GRANTED;
	} catch (error) {
		console.log("Permission Error:", error);
		return false;
	}
}

export async function requestNotificationPermission() {
	if (Platform.OS !== "android") {
		return false;
	}

	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
		);

		return granted === PermissionsAndroid.RESULTS.GRANTED;
	} catch (error) {
		console.log("Notification Permission Error:", error);
		return false;
	}
}
