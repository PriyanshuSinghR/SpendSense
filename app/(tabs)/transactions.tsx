import TransactionItem from "@/components/dashboard/TransactionItem";
import { useAppSelector } from "@/store/hooks";
import { Transaction } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
export default function TransactionsScreen() {
  const transactions = useAppSelector(
    (state) => state.transaction.transactions,
  );

  const years = [
    ...new Set(
      transactions.map((item) => new Date(item.date).getFullYear().toString()),
    ),
  ];

  const currentDate = new Date();

  const currentMonth = MONTHS[currentDate.getMonth()];

  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const [selectedType, setSelectedType] = useState("all");

  const [search, setSearch] = useState("");

  const filteredTransactions: Transaction[] = useMemo(() => {
    return transactions
      .filter((item) => {
        const date = new Date(item.date);

        const month = MONTHS[date.getMonth()];

        const year = date.getFullYear().toString();

        const typeMatch =
          selectedType === "all" ? true : item.type === selectedType;

        const searchMatch = item.merchant
          .toLowerCase()
          .includes(search.toLowerCase());

        return (
          month === selectedMonth &&
          year === selectedYear &&
          typeMatch &&
          searchMatch
        );
      })
      .sort((a, b) => b.date - a.date);
  }, [transactions, selectedMonth, selectedYear, selectedType, search]);

  const totalExpense = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalIncome = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  return (
    <View className="flex-1 bg-[#f5f5f5]">
      <ScrollView
        className="flex-1 px-5 pt-14"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <Pressable onPress={() => router.back()} className="mb-6">
          <Ionicons name="arrow-back" size={22} color="#9ca3af" />
        </Pressable>

        {/* TITLE */}

        <View className="flex-row items-center gap-4 mb-6 z-10">
          <Text className="text-[28px] font-bold text-gray-800">
            Transactions
          </Text>

          {/* YEAR DROPDOWN */}

          <View className="relative">
            <Pressable
              onPress={() => setShowYearDropdown(!showYearDropdown)}
              className="bg-white px-4 py-2.5 rounded-2xl flex-row items-center border border-gray-100 shadow-sm"
            >
              <Text className="text-sm font-semibold text-gray-800 mr-2">
                {selectedYear}
              </Text>

              <Ionicons
                name={showYearDropdown ? "chevron-up" : "chevron-down"}
                size={16}
                color="#6b7280"
              />
            </Pressable>

            {showYearDropdown && (
              <View className="absolute top-14 right-0 bg-white rounded-2xl py-2 w-28 border border-gray-100 shadow-lg">
                {years.map((year) => (
                  <Pressable
                    key={year}
                    onPress={() => {
                      setSelectedYear(year);

                      setShowYearDropdown(false);
                    }}
                    className={`px-4 py-3 flex-row items-center justify-between ${
                      selectedYear === year ? "bg-indigo-50" : ""
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        selectedYear === year
                          ? "text-indigo-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {year}
                    </Text>

                    {selectedYear === year && (
                      <Ionicons name="checkmark" size={14} color="#4f46e5" />
                    )}
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* SEARCH */}

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search merchant..."
          placeholderTextColor="#9ca3af"
          className="bg-white px-5 py-4 rounded-2xl mb-5 border border-gray-200 text-gray-800"
        />

        {/* TOTAL CARDS */}

        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white rounded-3xl p-5 border border-gray-100">
            <Text className="text-gray-500 text-sm mb-2">Income</Text>

            <Text className="text-2xl font-bold text-green-500">
              ₹{totalIncome.toFixed(2)}
            </Text>
          </View>

          <View className="flex-1 bg-white rounded-3xl p-5 border border-gray-100">
            <Text className="text-gray-500 text-sm mb-2">Expense</Text>

            <Text className="text-2xl font-bold text-red-500">
              ₹{totalExpense.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* TYPE FILTER */}

        <View className="flex-row gap-3 mb-6">
          {["all", "income", "expense"].map((type) => (
            <Pressable
              key={type}
              onPress={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-2xl ${
                selectedType === type
                  ? "bg-black"
                  : "bg-white border border-gray-200"
              }`}
            >
              <Text
                className={`font-medium capitalize ${
                  selectedType === type ? "text-white" : "text-black"
                }`}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* MONTHS */}

        <View className="mb-7">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 20,
            }}
          >
            {MONTHS.map((month) => (
              <Pressable
                key={month}
                onPress={() => setSelectedMonth(month)}
                className={`mr-3 px-5 py-2.5 rounded-2xl border ${
                  selectedMonth === month
                    ? "bg-[#1f2937] border-[#1f2937]"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-semibold tracking-wide ${
                    selectedMonth === month ? "text-white" : "text-gray-500"
                  }`}
                >
                  {month}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* TRANSACTIONS */}

        <View className="pb-10">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))
          ) : (
            <View className="bg-white rounded-3xl p-8 items-center border border-gray-100">
              <Ionicons
                name="receipt-outline"
                size={28}
                color="#9ca3af"
                style={{
                  marginBottom: 10,
                }}
              />

              <Text className="text-gray-800 font-semibold text-sm mb-1">
                No transactions found
              </Text>

              <Text className="text-gray-400 text-xs text-center">
                Try changing month, year, search or filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
