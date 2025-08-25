import { View, Text } from "react-native";

export default function Empty({
  search,
  text,
}: {
  search?: string;
  text?: string;
}) {
  const fallBack = `Ingen resultater funnet${
    search ? ` for "${search}"` : ""
  }.`;
  return (
    <View className="flex-1 items-center my-4">
      <Text className="text-lg text-gray-500">{text ? text : fallBack}</Text>
    </View>
  );
}
