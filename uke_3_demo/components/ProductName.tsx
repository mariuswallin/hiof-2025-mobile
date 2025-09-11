import { Text } from "react-native";
import type { Product } from "../types";

export default function ProductName({ name }: Pick<Product, "name">) {
  return <Text>{name}</Text>;
}
