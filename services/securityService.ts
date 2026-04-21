import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export async function saveToken(token: string) {
	await SecureStore.setItemAsync("user_token", token);
}

export async function getToken() {
	return await SecureStore.getItemAsync("user_token");
}

export async function authenticateUser() {
	const result = await LocalAuthentication.authenticateAsync({
		promptMessage: "Unlock SpendSense",
	});

	return result.success;
}
