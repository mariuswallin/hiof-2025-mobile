import { Text } from "react-native";
import { productStyles } from "./styles";

export default function ProductPrice({ price }: { price: number }) {
  return <Text style={productStyles.price}>Produktpris: {price} NOK</Text>;
}
