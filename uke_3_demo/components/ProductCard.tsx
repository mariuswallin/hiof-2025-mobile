import { View } from "react-native";
import { productStyles } from "./styles";
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";
import BuyButton from "./BuyButton";
import { Image } from "expo-image";

import MyImage from "../assets/img.jpg";

export default function ProductCard() {
  return (
    <View style={productStyles.card}>
      <ProductName />
      <ProductPrice />
      <Image source={MyImage} style={{ width: 200, height: 200 }} />
      <BuyButton />
    </View>
  );
}
