import { View } from "react-native";

interface Props {
  length: number;
}

export default function PinDots({ length }: Props) {
  return (
    <View className="flex-row justify-center mt-8">
      {[0, 1, 2, 3].map((index) => (
        <View
          key={index}
          className={`w-4 h-4 rounded-full mx-2 ${
            index < length ? "bg-[#6b5cff]" : "bg-gray-300"
          }`}
        />
      ))}
    </View>
  );
}
