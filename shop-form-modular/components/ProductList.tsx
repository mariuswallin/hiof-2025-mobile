import { ScrollView, StyleSheet } from "react-native";
import { ProductCard } from "./ProductCardWithProps";

export default function ProductList({
  products,
  theme = { background: "#fff" },
}: {
  theme?: { background: string };
  products: { id: string; name: string; price: number; description: string }[];
}) {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ gap: 25 }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
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
