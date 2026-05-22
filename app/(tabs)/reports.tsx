import { useAppSelector } from "@/store/hooks";
import { Transaction } from "@/types/transaction";

import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

import { Calendar } from "react-native-calendars";

import { AnimatedCircularProgress } from "react-native-circular-progress";

import { ScrollView, Text, View } from "react-native";

export default function ReportsScreen() {
  const transactions = useAppSelector(
    (state) => state.transaction.transactions,
  );

  // =========================
  // TOTALS
  // =========================

  const totalIncome = transactions
    .filter((item: Transaction) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = transactions
    .filter((item: Transaction) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const savings = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? Math.min(100, Math.round((savings / totalIncome) * 100))
      : 0;

  // =========================
  // FINANCIAL HEALTH
  // =========================

  const financialHealth =
    savings > 0
      ? Math.min(100, Math.floor((savings / (totalIncome || 1)) * 100))
      : 10;

  // =========================
  // MONTHLY SPENDING
  // =========================

  const monthlyMap: Record<string, number> = {};

  transactions.forEach((item: Transaction) => {
    if (item.type !== "expense") return;

    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    monthlyMap[month] = (monthlyMap[month] || 0) + item.amount;
  });

  const monthlyData = Object.entries(monthlyMap).map(
    ([label, value], index) => ({
      label,
      value,
      frontColor: [
        "#6b5cff",
        "#8b5cf6",
        "#06b6d4",
        "#22c55e",
        "#f97316",
        "#ef4444",
      ][index % 6],
    }),
  );

  // =========================
  // CATEGORY DETECTION
  // =========================

  const categoryMap: Record<string, number> = {};

  const getCategory = (merchant: string) => {
    const name = merchant.toLowerCase();

    if (
      name.includes("swiggy") ||
      name.includes("zomato") ||
      name.includes("restaurant") ||
      name.includes("burger") ||
      name.includes("cafe")
    ) {
      return "Food";
    }

    if (
      name.includes("spotify") ||
      name.includes("netflix") ||
      name.includes("amazon")
    ) {
      return "Entertainment";
    }

    if (
      name.includes("metro") ||
      name.includes("uber") ||
      name.includes("ola")
    ) {
      return "Travel";
    }

    if (name.includes("cred") || name.includes("bank")) {
      return "Finance";
    }

    return "Others";
  };

  transactions.forEach((item: Transaction) => {
    if (item.type !== "expense") return;

    const category = getCategory(item.merchant);

    categoryMap[category] = (categoryMap[category] || 0) + item.amount;
  });

  const categoryColors = [
    "#6b5cff",
    "#ef4444",
    "#06b6d4",
    "#22c55e",
    "#f59e0b",
  ];

  const pieData = Object.entries(categoryMap).map(([label, value], index) => ({
    value,
    text: label,
    color: categoryColors[index % categoryColors.length],
  }));

  // =========================
  // DAILY TREND
  // =========================

  const dailyMap: Record<string, number> = {};

  transactions.forEach((item: Transaction) => {
    if (item.type !== "expense") return;

    const day = new Date(item.date).getDate().toString();

    dailyMap[day] = (dailyMap[day] || 0) + item.amount;
  });

  const dailyData = Object.entries(dailyMap).map(([label, value]) => ({
    label,
    value,
    dataPointColor: "#6b5cff",
  }));

  // =========================
  // TOP MERCHANTS
  // =========================

  const merchantMap: Record<string, number> = {};

  transactions.forEach((item: Transaction) => {
    if (item.type !== "expense") return;

    merchantMap[item.merchant] =
      (merchantMap[item.merchant] || 0) + item.amount;
  });

  const topMerchants = Object.entries(merchantMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // =========================
  // HEATMAP
  // =========================

  const markedDates: Record<string, any> = {};

  transactions.forEach((item: Transaction) => {
    if (item.type !== "expense") return;

    const date = new Date(item.date).toISOString().split("T")[0];

    const amount = item.amount;

    let color = "#bbf7d0";

    if (amount > 1000) {
      color = "#ef4444";
    } else if (amount > 500) {
      color = "#fb923c";
    } else if (amount > 100) {
      color = "#facc15";
    }

    markedDates[date] = {
      selected: true,
      selectedColor: color,
    };
  });

  // =========================
  // HIGHEST EXPENSE
  // =========================

  const highestExpenseTransaction = [...transactions]
    .filter((item) => item.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <ScrollView
      className="flex-1 bg-[#f4f7ff] px-5 pt-14"
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <Text className="text-4xl font-black text-[#1f2937] mb-8">Reports</Text>

      {/* SUMMARY */}

      <View className="flex-row gap-4 mb-8">
        <View className="flex-1 bg-[#dcfce7] rounded-[32px] p-5">
          <Text className="text-green-700 mb-2 font-medium">Income</Text>

          <Text className="text-3xl font-black text-green-600">
            ₹{totalIncome.toFixed(0)}
          </Text>
        </View>

        <View className="flex-1 bg-[#fee2e2] rounded-[32px] p-5">
          <Text className="text-red-700 mb-2 font-medium">Expense</Text>

          <Text className="text-3xl font-black text-red-500">
            ₹{totalExpense.toFixed(0)}
          </Text>
        </View>
      </View>

      {/* BALANCE */}

      <View className="bg-[#6b5cff] rounded-[34px] p-7 mb-8">
        <Text className="text-white opacity-80 mb-2 text-base">
          Current Savings
        </Text>

        <Text className="text-white text-5xl font-black">
          ₹{savings.toFixed(0)}
        </Text>
      </View>

      {/* SAVINGS GOAL */}

      <View className="bg-white rounded-[34px] p-6 mb-8 border border-[#ececec] items-center">
        <Text className="text-xl font-bold text-gray-800 mb-6">
          Savings Goal
        </Text>

        <AnimatedCircularProgress
          size={190}
          width={18}
          fill={Number(savingsRate)}
          tintColor="#6b5cff"
          backgroundColor="#ececec"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View className="items-center">
              <Text className="text-4xl font-black text-[#6b5cff]">
                {savingsRate}%
              </Text>

              <Text className="text-gray-400 mt-2">Savings Rate</Text>
            </View>
          )}
        </AnimatedCircularProgress>

        <Text className="text-gray-500 mt-6 text-center leading-6">
          You are saving better than previous months.
        </Text>
      </View>

      {/* FINANCIAL HEALTH */}

      <View className="bg-[#ecfeff] rounded-[34px] p-6 mb-8 border border-[#a5f3fc]">
        <Text className="text-cyan-700 text-lg font-bold mb-4">
          Financial Health
        </Text>

        <Text className="text-5xl font-black text-cyan-500 mb-3">
          {financialHealth}/100
        </Text>

        <Text className="text-cyan-700 leading-6">
          Your spending and savings habits are improving steadily.
        </Text>
      </View>

      {/* MONTHLY CHART */}

      <View className="bg-white rounded-[34px] p-6 mb-8 border border-[#ececec]">
        <Text className="text-xl font-bold text-gray-800 mb-6">
          Monthly Spending
        </Text>

        <BarChart
          data={monthlyData}
          barWidth={28}
          roundedTop
          spacing={20}
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          noOfSections={4}
        />
      </View>

      {/* CATEGORY */}

      <View className="bg-white rounded-[34px] p-6 mb-8 border border-[#ececec]">
        <Text className="text-xl font-bold text-gray-800 mb-6">
          Category Breakdown
        </Text>

        <PieChart
          data={pieData}
          donut
          radius={110}
          innerRadius={55}
          textColor="black"
          showText
          focusOnPress
        />

        <View className="mt-6 gap-3">
          {pieData.map((item) => (
            <View
              key={item.text}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View
                  style={{
                    backgroundColor: item.color,
                    width: 12,
                    height: 12,
                    borderRadius: 100,
                    marginRight: 10,
                  }}
                />

                <Text className="text-gray-700 font-medium">{item.text}</Text>
              </View>

              <Text className="text-gray-500">₹{item.value.toFixed(0)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* DAILY TREND */}

      <View className="bg-white rounded-[34px] p-6 mb-8 border border-[#ececec]">
        <Text className="text-xl font-bold text-gray-800 mb-6">
          Daily Spending Trend
        </Text>

        <LineChart
          data={dailyData}
          curved
          thickness={4}
          color="#6b5cff"
          hideRules
          hideDataPoints={false}
          yAxisThickness={0}
          xAxisThickness={0}
          spacing={40}
        />
      </View>

      {/* HEATMAP */}

      <View className="bg-white rounded-[34px] p-5 mb-8 border border-[#ececec]">
        <Text className="text-xl font-bold text-gray-800 mb-6">
          Spending Heatmap
        </Text>

        <Calendar
          markedDates={markedDates}
          theme={{
            todayTextColor: "#6b5cff",
            arrowColor: "#6b5cff",
            monthTextColor: "#111827",
            textMonthFontWeight: "bold",
            textDayFontWeight: "500",
          }}
        />

        <View className="flex-row justify-between mt-5">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-[#bbf7d0] mr-2" />
            <Text className="text-xs text-gray-500">Low</Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-[#facc15] mr-2" />
            <Text className="text-xs text-gray-500">Medium</Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-[#ef4444] mr-2" />
            <Text className="text-xs text-gray-500">High</Text>
          </View>
        </View>
      </View>

      {/* HIGHEST EXPENSE */}

      <View className="bg-[#ffe4e6] rounded-[34px] p-6 mb-8 border border-[#fecdd3]">
        <Text className="text-[#be123c] text-lg font-bold mb-4">
          Highest Expense
        </Text>

        {highestExpenseTransaction ? (
          <>
            <Text className="text-5xl font-black text-[#e11d48] mb-2">
              ₹{highestExpenseTransaction.amount.toFixed(0)}
            </Text>

            <Text className="text-[#881337] font-semibold text-lg">
              {highestExpenseTransaction.merchant}
            </Text>

            <Text className="text-[#9f1239] mt-2">
              {new Date(highestExpenseTransaction.date).toDateString()}
            </Text>
          </>
        ) : (
          <Text>No expenses found</Text>
        )}
      </View>

      {/* TOP MERCHANTS */}

      <View className="bg-white rounded-[34px] p-6 mb-12 border border-[#ececec]">
        <Text className="text-xl font-bold text-gray-800 mb-5">
          Top Merchants
        </Text>

        {topMerchants.map(([merchant, amount], index) => (
          <View
            key={merchant}
            className={`flex-row justify-between items-center py-4 ${
              index !== topMerchants.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-[#ede9fe] items-center justify-center mr-4">
                <Text className="text-[#6b5cff] font-bold">
                  {merchant.charAt(0)}
                </Text>
              </View>

              <Text className="text-gray-800 font-semibold">{merchant}</Text>
            </View>

            <Text className="text-red-500 font-black text-lg">
              ₹{amount.toFixed(0)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
