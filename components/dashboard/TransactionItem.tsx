import { Transaction } from "@/types/transaction";
import { Pressable, Text, View } from "react-native";

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: Props) {
  return (
    <Pressable className="bg-[#fafafa] rounded-[28px] px-6 py-6 mb-5 flex-row items-center justify-between border border-[#ededed]">
      <View className="flex-1 pr-4">
        <Text
          numberOfLines={1}
          className="text-[18px] font-bold text-[#363636] mb-2"
        >
          {transaction.merchant}
        </Text>

        <Text className="text-[13px] text-[#969696]">
          {new Date(transaction.date).toDateString()}
        </Text>
      </View>

      <Text
        className={`text-[18px] font-bold ${
          transaction.type === "expense" ? "text-red-500" : "text-green-500"
        }`}
      >
        {transaction.type === "expense" ? "-" : "+"}₹
        {transaction.amount.toFixed(2)}
      </Text>
    </Pressable>
  );
}
