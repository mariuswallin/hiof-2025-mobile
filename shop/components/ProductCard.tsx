import { View } from "react-native";
import { productStyles } from "./styles";
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";
import BuyButton from "./BuyButton";

export const ProductCard = () => {
  return (
    <View style={productStyles.card}>
      <ProductName />
      <ProductPrice />
      <BuyButton />
    </View>
  );
};
