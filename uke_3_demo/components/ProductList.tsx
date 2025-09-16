import { ScrollView, StyleSheet } from "react-native";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
