// app/(profile)/user-profile.tsx

import User from "@/components/User";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function UserProfile() {
  return (
    <View className="flex-1 p-2">
      <User />
      <Link href="/profile" className="flex-1 underline">
        <Text>Se student id</Text>
      </Link>
    </View>
  );
}
