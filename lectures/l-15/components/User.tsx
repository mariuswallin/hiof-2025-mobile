// components/User.tsx

import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";
export default function User() {
  const router = useRouter();
  const { user, logout } = useAuth();
  if (!user) {
    return null;
  }

  return (
    <View className="p-6">
      <Text>{user.id}</Text>
      <Text>{user.email}</Text>
      <Text>{user.role}</Text>
      <TouchableOpacity
        onPress={async () => {
          await logout();
          router.replace("/");
        }}
        className="bg-blue-500 p-2 rounded my-4"
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
