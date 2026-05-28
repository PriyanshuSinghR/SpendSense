import { useAppSelector } from "@/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const gradients = [
  "bg-[#d9b3f3]",
  "bg-[#e8c36d]",
  "bg-[#c9b5f7]",
  "bg-[#e3b7a7]",
  "bg-[#9de4e1]",
];

const quickCardColors = [
  {
    bg: "bg-[#ffffff]",
    text: "text-[#635bff]",
  },
  {
    bg: "bg-[#f8c7d8]",
    text: "text-black",
  },
  {
    bg: "bg-[#d9f7e8]",
    text: "text-[#0f9f6e]",
  },
  {
    bg: "bg-[#dbeafe]",
    text: "text-[#2563eb]",
  },
];

interface ManualTransfer {
  id: number;
  receiver: string;
  amount: number;
  note: string;
  bank: string;
  date: number;
}

export default function TransferScreen() {
  const transactions = useAppSelector(
    (state) => state.transaction.transactions,
  );

  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);

  const [showTransferModal, setShowTransferModal] = useState(false);

  const [transferName, setTransferName] = useState("");

  const [transferAmount, setTransferAmount] = useState("");

  const [transferNote, setTransferNote] = useState("");

  const [transferBank, setTransferBank] = useState("");

  const [manualTransfers, setManualTransfers] = useState<ManualTransfer[]>([]);

  const merchantMap: Record<string, number> = {};

  transactions.forEach((item) => {
    if (item.type !== "expense") return;

    merchantMap[item.merchant] =
      (merchantMap[item.merchant] || 0) + item.amount;
  });

  const quickTransfers = Object.entries(merchantMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([merchant], index) => ({
      name: merchant,
      logo: merchant.slice(0, 2).toUpperCase(),
      bg: quickCardColors[index % quickCardColors.length].bg,
      text: quickCardColors[index % quickCardColors.length].text,
    }));

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      if (item.type !== "expense") return false;

      if (!selectedMerchant) return true;

      return item.merchant === selectedMerchant;
    });
  }, [transactions, selectedMerchant]);

  function handleSaveTransfer() {
    if (!transferName || !transferAmount) return;

    const newTransfer: ManualTransfer = {
      id: Date.now(),
      receiver: transferName,
      amount: Number(transferAmount),
      note: transferNote,
      bank: transferBank,
      date: Date.now(),
    };

    setManualTransfers((prev) => [newTransfer, ...prev]);

    setTransferName("");
    setTransferAmount("");
    setTransferNote("");
    setTransferBank("");

    setShowTransferModal(false);
  }

  return (
    <View className="flex-1 bg-[#f4f4f4]">
      <ScrollView
        className="flex-1 px-5 pt-14"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mb-10">
          <View className="relative">
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=12",
              }}
              className="w-14 h-14 rounded-full"
            />

            <View className="absolute right-0 top-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
          </View>

          <Text className="text-[30px] font-bold text-[#363636] tracking-tight">
            Transfer
          </Text>

          <Pressable
            onPress={() => setShowTransferModal(true)}
            className="w-11 h-11 rounded-full items-center justify-center bg-white border border-[#ececec]"
          >
            <Ionicons name="add" size={34} color="#9b6bff" />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          className="mb-10"
        >
          {quickTransfers.map((item, index) => {
            const active = selectedMerchant === item.name;

            return (
              <Pressable
                key={index}
                onPress={() => {
                  if (active) {
                    setSelectedMerchant(null);
                  } else {
                    setSelectedMerchant(item.name);
                  }
                }}
                className={`w-28 h-28 rounded-[28px] mr-4 items-center justify-center border ${
                  active
                    ? "bg-[#6b5cff] border-[#6b5cff]"
                    : `${item.bg} border-[#ececec]`
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.06,
                  shadowRadius: 10,
                  elevation: 3,
                }}
              >
                <Text
                  className={`text-[20px] font-bold ${
                    active ? "text-white" : item.text
                  }`}
                >
                  {item.logo}
                </Text>

                <Text
                  numberOfLines={1}
                  className={`text-[12px] mt-2 px-2 ${
                    active ? "text-white" : "text-gray-500"
                  }`}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {selectedMerchant && (
          <View className="flex-row items-center justify-between mb-5">
            <Text
              numberOfLines={1}
              className="flex-1 text-[18px] font-bold text-[#363636] mr-4"
            >
              {selectedMerchant} Transfers
            </Text>

            <Pressable onPress={() => setSelectedMerchant(null)}>
              <Text className="text-[#8b5cf6] font-semibold">Clear</Text>
            </Pressable>
          </View>
        )}

        <View className="pb-5">
          {filteredTransactions.map((item, index) => (
            <Pressable
              key={index}
              className="bg-[#fafafa] rounded-[30px] px-6 py-6 mb-5 flex-row items-center border border-[#ededed]"
            >
              <View
                className={`w-16 h-16 rounded-full ${
                  gradients[index % gradients.length]
                } items-center justify-center mr-5`}
              >
                <Text className="text-white text-[24px] font-bold">
                  {item.merchant.slice(0, 2).toUpperCase()}
                </Text>
              </View>

              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="text-[17px] font-bold text-[#363636] mb-1"
                >
                  {item.merchant}
                </Text>

                <Text className="text-[13px] text-[#969696] tracking-wide">
                  {new Date(item.date).toDateString()}
                </Text>
              </View>

              <Text className="text-[18px] font-bold text-red-500">
                ₹{item.amount.toFixed(0)}
              </Text>
            </Pressable>
          ))}
        </View>

        {manualTransfers.length > 0 && (
          <View className="pb-10">
            <Text className="text-[24px] font-bold text-[#363636] mb-5">
              Manual Transfers
            </Text>

            {manualTransfers.map((item, index) => (
              <View
                key={item.id}
                className="bg-white rounded-[30px] px-6 py-6 mb-5 border border-[#ececec]"
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-16 h-16 rounded-full ${
                      gradients[index % gradients.length]
                    } items-center justify-center mr-5`}
                  >
                    <Text className="text-white text-[22px] font-bold">
                      {item.receiver.slice(0, 2).toUpperCase()}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text
                      numberOfLines={1}
                      className="text-[17px] font-bold text-[#363636]"
                    >
                      {item.receiver}
                    </Text>

                    <Text className="text-[13px] text-[#969696] mt-1">
                      {item.bank || "Manual Bank Transfer"}
                    </Text>
                  </View>

                  <Text className="text-[18px] font-bold text-[#6b5cff]">
                    ₹{item.amount}
                  </Text>
                </View>

                {item.note ? (
                  <View className="mt-5 bg-[#f6f4ff] rounded-2xl p-4">
                    <Text className="text-[#6b5cff] font-semibold mb-1">
                      Notes
                    </Text>

                    <Text className="text-gray-600 leading-6">{item.note}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal visible={showTransferModal} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/40">
          <View
            className="bg-[#f5f5f5] rounded-t-[34px]"
            style={{
              height: Platform.OS === "ios" ? "88%" : "92%",
            }}
          >
            <KeyboardAwareScrollView
              enableOnAndroid
              enableAutomaticScroll
              keyboardShouldPersistTaps="handled"
              extraHeight={140}
              extraScrollHeight={140}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: 24,
                paddingBottom: 160,
              }}
            >
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-[24px] font-bold text-[#363636]">
                  Add Transfer
                </Text>

                <Pressable onPress={() => setShowTransferModal(false)}>
                  <Ionicons name="close" size={26} color="#111827" />
                </Pressable>
              </View>

              <TextInput
                value={transferName}
                onChangeText={setTransferName}
                placeholder="Receiver Name"
                placeholderTextColor="#9ca3af"
                className="bg-white rounded-2xl px-5 py-4 mb-4 border border-gray-200 text-gray-800"
              />

              <TextInput
                value={transferBank}
                onChangeText={setTransferBank}
                placeholder="Bank Name"
                placeholderTextColor="#9ca3af"
                className="bg-white rounded-2xl px-5 py-4 mb-4 border border-gray-200 text-gray-800"
              />

              <TextInput
                value={transferAmount}
                onChangeText={setTransferAmount}
                placeholder="Amount"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                className="bg-white rounded-2xl px-5 py-4 mb-4 border border-gray-200 text-gray-800"
              />

              <TextInput
                value={transferNote}
                onChangeText={setTransferNote}
                placeholder="Notes"
                placeholderTextColor="#9ca3af"
                multiline
                scrollEnabled={false}
                textAlignVertical="top"
                style={{
                  minHeight: 110,
                  paddingTop: 18,
                }}
                className="bg-white rounded-2xl px-5 py-4 mb-6 border border-gray-200 text-gray-800"
              />

              <Pressable
                onPress={handleSaveTransfer}
                className="bg-[#6b5cff] rounded-2xl py-4 items-center"
              >
                <Text className="text-white font-bold text-[16px]">
                  Save Transfer
                </Text>
              </Pressable>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
