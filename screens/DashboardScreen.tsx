import { parseTransactionMessage } from "@/services/parserService";
import { requestSmsPermission } from "@/services/permissionService";
import { getBankSms } from "@/services/smsService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTransaction } from "@/store/transactionSlice";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function DashboardScreen() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(
    (state) => state.transaction.transactions,
  );

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  useEffect(() => {
    async function loadSms() {
      const granted = await requestSmsPermission();

      if (!granted) {
        console.log("Permission denied");
        return;
      }

      try {
        const smsList: any = await getBankSms();

        smsList.forEach((sms: any, index: number) => {
          const parsed = parseTransactionMessage(sms.body);

          console.log("PARSED:", {
            id: sms._id,
            merchant: parsed.merchant,
            amount: parsed.amount,
            type: parsed.type,
            date: new Date(Number(sms.date)).toDateString(),
          });

          const alreadyExists = transactions.some(
            (item) => item.id === sms._id.toString(),
          );

          if (parsed.amount > 0 && !alreadyExists) {
            dispatch(
              addTransaction({
                id: sms._id,
                merchant: parsed.merchant,
                amount: parsed.amount,
                type: parsed.type,
                date: new Date(Number(sms.date)).toDateString(),
              }),
            );
          }
        });
      } catch (error) {
        console.log("SMS ERROR:", error);
      }
    }

    loadSms();
  }, []);

  return (
    <View className="flex-1 bg-[#f4f4f4]">
      <View className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#f3dc84] opacity-90" />

      <View className="absolute left-[-90px] top-[320px] w-56 h-56 rounded-full bg-[#b8e6fb] opacity-90" />

      <ScrollView
        className="flex-1 px-5 pt-14"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[16px] text-[#909090] mb-6 tracking-wide">
          account overview
        </Text>

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
              $12567.89
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
          {sortedTransactions.map((item, index) => (
            <Pressable
              key={item.id}
              className="bg-[#fafafa] rounded-[28px] px-6 py-6 mb-5 flex-row items-center justify-between border border-[#ededed]"
            >
              <View>
                <Text className="text-[18px] font-bold text-[#363636] mb-2">
                  {item.merchant}
                </Text>

                <Text className="text-[13px] text-[#969696]">{item.date}</Text>
              </View>

              <Text
                className={`text-[18px] font-bold ${
                  item.type === "expense" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.type === "expense" ? "-" : "+"}₹{item.amount}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
