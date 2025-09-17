import { ScrollView, StyleSheet } from "react-native";

import type { Product } from "../types";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ScrollView
      contentContainerStyle={{ gap: 25 }}
      style={{ flex: 1, width: "100%" }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
  );
}
