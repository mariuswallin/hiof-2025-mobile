import { Tabs, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const { id } = useLocalSearchParams();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="buy"
        initialParams={{ id }}
        options={{
          title: "Kjøp",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-add" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
