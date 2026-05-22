import * as LocalAuthentication from "expo-local-authentication";

export async function authenticateBiometric() {
  const compatible = await LocalAuthentication.hasHardwareAsync();

  if (!compatible) {
    return false;
  }

  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!enrolled) {
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock SpendSense",
    fallbackLabel: "Use PIN",
    disableDeviceFallback: false,
  });

  return result.success;
}
