// app/(admin)/(students)/_layout.tsx

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../constants/theme";
import { FloatingButton } from "../../../components/FloatingButton";

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
          title: "",
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? Theme.primary : Theme.background;
            const buttonColor = focused ? Theme.background : Theme.primary;
            return (
              <FloatingButton color={buttonColor} size={60}>
                <Ionicons name="add-circle" size={60} color={iconColor} />
              </FloatingButton>
            );
          },
        }}
      />
    </Tabs>
  );
}
