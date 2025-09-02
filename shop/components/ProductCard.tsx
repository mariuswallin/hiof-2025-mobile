import { View } from "react-native";
import { productStyles } from "./styles";
import { Image } from "expo-image";
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";
import BuyButton from "./BuyButton";

import image from "../assets/img.jpg";

export const ProductCard = () => {
  return (
    <View style={productStyles.card}>
      <ProductName />
      <ProductPrice />
      <Image source={image} style={productStyles.image} contentFit="cover" />
      <BuyButton />
    </View>
  );
};
