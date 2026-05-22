import * as SecureStore from "expo-secure-store";

export async function savePin(pin: string) {
  await SecureStore.setItemAsync("app_pin", pin);
}

export async function getPin() {
  return await SecureStore.getItemAsync("app_pin");
}

export async function removePin() {
  await SecureStore.deleteItemAsync("app_pin");
}

export async function saveBiometricEnabled(value: boolean) {
  await SecureStore.setItemAsync("biometric_enabled", JSON.stringify(value));
}

export async function getBiometricEnabled() {
  const value = await SecureStore.getItemAsync("biometric_enabled");

  return value ? JSON.parse(value) : false;
}
