import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "./ProductCardWithProps";
import { Link } from "expo-router";

export default function ProductList({
  products,
  theme = { background: "#fff" },
}: {
  theme?: { background: string };
  products: { id: string; name: string; price: number; description: string }[];
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.background }}
          contentContainerStyle={{ gap: 25 }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product}>
              <Link href={`/products/${product.id}`} style={styles.link}>
                <Text>Se detaljer</Text>
              </Link>
            </ProductCard>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
  link: {
    marginTop: 10,
    backgroundColor: "#002266",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
});
