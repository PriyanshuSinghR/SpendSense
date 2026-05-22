import {
    getBiometricEnabled,
    removePin,
    saveBiometricEnabled,
} from "@/services/secureStoreService";
import React, { useEffect, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    async function load() {
      const value = await getBiometricEnabled();

      setEnabled(value);
    }

    load();
  }, []);

  async function toggleBiometric() {
    const newValue = !enabled;

    setEnabled(newValue);

    await saveBiometricEnabled(newValue);
  }

  return (
    <View className="flex-1 bg-[#f5f5f5] px-5 pt-16">
      <Text className="text-3xl font-black text-gray-800 mb-8">Security</Text>

      <View className="bg-white rounded-[30px] p-6 mb-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-800">
              Biometric Unlock
            </Text>

            <Text className="text-gray-500 mt-1">Fingerprint / Face ID</Text>
          </View>

          <Switch value={enabled} onValueChange={toggleBiometric} />
        </View>
      </View>

      <Pressable
        onPress={async () => {
          await removePin();
        }}
        className="bg-red-500 rounded-[28px] p-5"
      >
        <Text className="text-white text-center font-bold text-[16px]">
          Remove PIN
        </Text>
      </Pressable>
    </View>
  );
}
