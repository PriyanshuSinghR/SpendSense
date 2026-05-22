import { Redirect, Stack } from "expo-router";

import { Provider } from "react-redux";

import { store } from "@/store/store";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useEffect } from "react";

import { AppState } from "react-native";

import { lockApp } from "@/store/authSlice";

function RootNavigation() {
  const dispatch = useAppDispatch();

  const isLocked = useAppSelector((state) => state.auth.isLocked);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        dispatch(lockApp());
      }
    });

    return () => subscription.remove();
  }, []);

  if (isLocked) {
    return <Redirect href="/lock" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
