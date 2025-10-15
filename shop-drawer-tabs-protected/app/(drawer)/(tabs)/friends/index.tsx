import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Friends() {
  return (
    <View>
      <Text>Friends</Text>
      <Link href="/main">Go to main</Link>
    </View>
  );
}
