// /app/(admin)/_layout.tsx

import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";

export default function AdminLayout() {
  return (
    <View>
      <Text>Admin Layout</Text>
      <Slot />
    </View>
  );
}
