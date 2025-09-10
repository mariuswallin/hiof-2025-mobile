import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <>
      <Text>Admin area</Text>
      <Slot />
    </>
  );
}
