import { Pressable, Text, type GestureResponderEvent } from "react-native";
import { productStyles } from "./styles";

export default function BuyButton() {
  const handlePress = (e: GestureResponderEvent) => {
    console.log("Button pressed", e.currentTarget);
  };
  return (
    <Pressable onPress={handlePress} style={productStyles.button}>
      <Text style={{ color: "white", fontWeight: "bold" }}>Kjøp</Text>
    </Pressable>
  );
}
