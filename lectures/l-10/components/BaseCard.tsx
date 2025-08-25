import { Text, View } from "react-native";

export type CardProps = {
  children: React.ReactNode;
  title?: string;
};

export default function Card({ children, title }: CardProps) {
  return (
    <View className="flex-1 items-center justify-center bg-[#f5f5f5] p-5 h-full">
      <View className="w-[90%] bg-white rounded-lg overflow-hidden shadow-lg">
        <View className="p-4 items-center bg-primary">
          <Text className="text-white font-bold text-base">{title}</Text>
        </View>
        {children}
      </View>
    </View>
  );
}
