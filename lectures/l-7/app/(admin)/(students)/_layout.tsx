// app/(admin)/(students)/_layout.tsx

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../constants/theme";

export default function StudentsGroupLayout() {
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
        // Skjuler headeren i toppen
        headerShown: false,
      }}
    >
      <Tabs.Screen
        // name matcher filnavnet
        name="back"
        options={{
          title: "Back",
          tabBarIcon: ({ color, size }) => (
            // Bruker expo sitt ikonsett for å sette ikonene
            <Ionicons name="arrow-back-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
