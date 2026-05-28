import { lockApp } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { store } from "@/store/store";
import { Redirect, Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";
import { Provider } from "react-redux";
import "../global.css";

function RootNavigation() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const isLocked = useAppSelector((state) => state.auth.isLocked);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        dispatch(lockApp());
      }
    });

    return () => subscription.remove();
  }, [dispatch]);

  if (isLocked && pathname !== "/lock") {
    return <Redirect href="/lock" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="lock" />
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
