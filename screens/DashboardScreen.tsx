import TransactionItem from "@/components/dashboard/TransactionItem";
import { parseTransactionMessage } from "@/services/parserService";
import { requestSmsPermission } from "@/services/permissionService";
import { getBankSms } from "@/services/smsService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTransactions } from "@/store/transactionSlice";
import { SmsMessage } from "@/types/sms";
import { Transaction } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function DashboardScreen() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(
    (state) => state.transaction.transactions,
  );

  useEffect(() => {
    async function loadSms() {
      if (transactions.length > 0) return;
      const granted = await requestSmsPermission();

      if (!granted) {
        console.log("Permission denied");
        return;
      }

      try {
        const smsList: SmsMessage[] = await getBankSms();

        const parsedTransactions = smsList
          .map((sms: SmsMessage) => {
            const parsed = parseTransactionMessage(sms.body, sms.address);

            if (!parsed) return null;

            // console.log("PARSED:", {
            //   id: sms._id,
            //   merchant: parsed.merchant,
            //   amount: parsed.amount,
            //   type: parsed.type,
            //   date: new Date(Number(sms.date)).toDateString(),
            // });

            return {
              id: sms._id,
              merchant: parsed.merchant,
              amount: parsed.amount,
              type: parsed.type,
              date: Number(sms.date),
            };
          })
          .filter((item): item is Transaction => item !== null)
          .filter((item) => item.amount > 0)
          .sort((a, b) => b.date - a.date);

        dispatch(setTransactions(parsedTransactions));
      } catch (error) {
        console.log("SMS ERROR:", error);
      }
    }

    loadSms();
  }, [dispatch]);

  const latestTransactions = transactions.slice(0, 5);

  const totalBalance = transactions.reduce((acc, item) => {
    return item.type === "income" ? acc + item.amount : acc - item.amount;
  }, 0);

  return (
    <View className="flex-1 bg-[#f4f4f4]">
      <Pressable
        onPress={() => router.push("/settings")}
        className="absolute top-14 right-5 z-50 bg-white p-3 rounded-full"
      >
        <Ionicons name="settings-outline" size={22} color="#111827" />
      </Pressable>
      <View className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#f3dc84] opacity-90" />

      <View className="absolute left-[-90px] top-[320px] w-56 h-56 rounded-full bg-[#b8e6fb] opacity-90" />

      <ScrollView
        className="flex-1 px-5 pt-14"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center mb-10">
          <View className="relative mr-5">
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=12",
              }}
              className="w-16 h-16 rounded-full border-[3px] border-[#635bff]"
            />

            <View className="absolute right-0 top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
          </View>

          <View>
            <Text className="text-[18px] text-[#2f2f2f] mb-1">
              Good morning
            </Text>

            <Text className="text-[24px] font-bold text-black tracking-wide">
              ANDREA
            </Text>
          </View>
        </View>

        <View className="rounded-[34px] overflow-hidden mb-12 bg-[#f7f2f3] border border-[#ececec]">
          <View className="px-6 pt-8 pb-7 bg-[#f7f2f3]">
            <Text className="text-[16px] text-[#3b3b3b] mb-5 font-medium">
              Current Balance
            </Text>

            <Text className="text-[26px] font-bold text-[#3b3b3b]">
              ₹{totalBalance.toFixed(2)}
            </Text>
          </View>

          <View className="px-6 py-7 bg-[#6b5cff]">
            <Text className="text-white text-[20px] font-bold tracking-[3px] mb-3">
              3452 1235 7894 1678
            </Text>

            <Text className="text-white text-[14px] tracking-[2px] opacity-90">
              05/2025
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-[15px] font-bold tracking-wide text-[#8c8c8c] uppercase">
            Last Transactions
          </Text>

          <Pressable onPress={() => router.push("/transactions")}>
            <Text className="text-[13px] font-semibold text-[#8b6dff]">
              See all
            </Text>
          </Pressable>
        </View>

        <View className="pb-28">
          {latestTransactions.map((item) => (
            <TransactionItem key={item.id} transaction={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
