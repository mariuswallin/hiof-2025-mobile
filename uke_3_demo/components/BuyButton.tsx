import { Pressable, Text, type GestureResponderEvent } from "react-native";

export default function BuyButton() {
  const handlePress = (e: GestureResponderEvent) => {
    console.log("Kjøp knapp trykket", e.currentTarget);
  };

  return (
    <Pressable onPress={handlePress}>
      <Text style={{ color: "white", fontWeight: "bold" }}>Kjøp</Text>
    </Pressable>
  );
}
