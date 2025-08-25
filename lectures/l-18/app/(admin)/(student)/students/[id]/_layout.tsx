// app/(admin)/(student)/students/[id]/_layout.tsx

import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../../../constants/theme";
import { useFormContext } from "@/context/FormContextReducer";

export default function StudentDetailLayout() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { dispatch } = useFormContext();
  return (
    <Tabs
      screenListeners={{
        tabPress: (e) => {
          e.preventDefault();
          const targetPath = e.target?.split("-")[0];
          const routes = {
            back: "/list",
            index: `/students/${id}`,
            edit: `/students/${id}/edit`,
            delete: `/students/${id}/delete`,
          };

          // Prevent default action
          dispatch({ type: "RESET_FORM" });
          // Navigate to the back screen
          if (targetPath)
            router.navigate(
              targetPath in routes
                ? routes[targetPath as keyof typeof routes]
                : "/list"
            );
        },
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: Theme.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
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
          headerShown: false,
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
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
