import { View } from "react-native";
import { productStyles } from "./styles";
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";
import BuyButton from "./BuyButton";
import { Image } from "expo-image";

import MyImage from "../assets/img.jpg";
import type { Product } from "../types";

type Props = {
  product: Product;
};

export default function ProductCard(props: Props) {
  const { product } = props;

  return (
    <View style={productStyles.card}>
      <ProductName name={product.name} />
      <ProductPrice price={product.price} />
      <Image source={MyImage} style={{ width: "100%", height: 200 }} />
      <BuyButton />
    </View>
  );
}
