import { Pressable, Text } from "react-native";
import { productStyles } from "./styles";

export default function BuyButton() {
  return (
    <Pressable onPress={() => {}} style={productStyles.button}>
      <Text style={{ color: "white", fontWeight: "bold" }}>Kjøp</Text>
    </Pressable>
  );
}
