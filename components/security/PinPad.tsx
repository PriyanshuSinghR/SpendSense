import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress: (num: string) => void;

  onDelete: () => void;
}

const numbers = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "⌫"],
];

export default function PinPad({ onPress, onDelete }: Props) {
  return (
    <View className="mt-10">
      {numbers.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center mb-5">
          {row.map((item) => (
            <TouchableOpacity
              key={item}
              disabled={!item}
              onPress={() => {
                if (item === "⌫") {
                  onDelete();
                } else {
                  onPress(item);
                }
              }}
              className="w-20 h-20 rounded-full bg-white mx-3 items-center justify-center border border-gray-200"
            >
              <Text className="text-3xl font-bold text-gray-800">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
