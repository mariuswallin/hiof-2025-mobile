// app/(admin)/(student)/students/[id]/_layout.tsx

import { Tabs, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../../../constants/theme";

export default function StudentDetailLayout() {
  const { id } = useLocalSearchParams();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="back"
        options={{
          title: "Back",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-back-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        initialParams={{ id }}
        options={{
          title: "View",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: "Edit",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
          href: `/students/${id}/edit`,
        }}
      />
      <Tabs.Screen
        name="delete"
        initialParams={{ id }}
        options={{
          title: "Delete",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trash" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
