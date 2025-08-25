// /app/(admin)/demo.tsx

import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Demo() {
  return (
    <View>
      <Text>This is a demo page.</Text>
      <Link href="/demotwo">Go to Another Demo</Link>
    </View>
  );
}
