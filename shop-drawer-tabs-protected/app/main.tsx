import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Main() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16 }}>Main</Text>
      <Link href="/friends" style={{ margin: 16 }}>
        Go to friends
      </Link>
    </View>
  );
}
