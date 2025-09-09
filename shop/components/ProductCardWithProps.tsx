import { View } from "react-native";
import { productStyles } from "./styles";
import { Image } from "expo-image";
import ProductName from "./ProductNameWithProps";
import ProductPrice from "./ProductPriceWithProps";
import BuyButton from "./BuyButton";

import image from "../assets/img.jpg";

export const ProductCard = ({
  product,
}: {
  product?: { name?: string; price?: number; description?: string };
}) => {
  return (
    <View style={productStyles.card}>
      <ProductName name={product?.name} />
      <ProductPrice price={product?.price} />
      <Image source={image} style={productStyles.image} contentFit="cover" />
      <BuyButton />
    </View>
  );
};
