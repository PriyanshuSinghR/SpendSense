import PinDots from "@/components/security/PinDots";
import PinPad from "@/components/security/PinPad";

import {
    getBiometricEnabled,
    getPin,
    savePin,
} from "@/services/secureStoreService";
import { unlockApp } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import * as Haptics from "expo-haptics";

import { router } from "expo-router";

import { useEffect, useState } from "react";

import { authenticateBiometric } from "@/services/biometricService";
import { Text, View } from "react-native";

export default function LockScreen() {
  const dispatch = useAppDispatch();
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState<string | null>(null);
  const [firstPin, setFirstPin] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function loadPin() {
      const existingPin = await getPin();

      if (existingPin) {
        setSavedPin(existingPin);
      } else {
        setIsCreating(true);
      }
    }
    loadPin();
  }, []);

  const [checkedBiometric, setCheckedBiometric] = useState(false);

  useEffect(() => {
    if (checkedBiometric) return;

    async function tryBiometric() {
      setCheckedBiometric(true);

      const enabled = await getBiometricEnabled();

      if (!enabled) return;

      const success = await authenticateBiometric();

      if (success) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );

        dispatch(unlockApp());

        router.replace("/");
      }
    }

    tryBiometric();
  }, [checkedBiometric, dispatch]);

  async function handleNumberPress(num: string) {
    if (pin.length >= 4) return;
    const newPin = pin + num;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPin(newPin);
    if (newPin.length === 4) {
      // CREATE NEW PIN
      if (isCreating) {
        if (!firstPin) {
          setFirstPin(newPin);
          setPin("");
          return;
        }

        if (firstPin === newPin) {
          await savePin(newPin);
          dispatch(unlockApp());
          router.replace("/");
          return;
        }
        setFirstPin("");
        setPin("");
        return;
      }

      // LOGIN PIN

      if (savedPin === newPin) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
        dispatch(unlockApp());
        router.replace("/");
        return;
      }

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      setTimeout(() => {
        setPin("");
      }, 300);
    }
  }

  function handleDelete() {
    setPin((prev) => prev.slice(0, -1));
  }

  return (
    <View className="flex-1 bg-[#f5f5f5] items-center justify-center px-6">
      <Text className="text-4xl font-black text-[#1f2937]">SpendSense</Text>

      <Text className="text-gray-500 mt-4 text-center">
        {isCreating
          ? firstPin
            ? "Confirm your PIN"
            : "Create a 4-digit PIN"
          : "Enter your PIN"}
      </Text>

      <PinDots length={pin.length} />

      <PinPad onPress={handleNumberPress} onDelete={handleDelete} />
    </View>
  );
}
