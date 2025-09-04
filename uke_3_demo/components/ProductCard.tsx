import { View } from "react-native";
import { productStyles } from "./styles";
import ProductName from "./ProductName";

export default function ProductCard() {
  return (
    <View style={productStyles.card}>
      <ProductName />
    </View>
  );
}
