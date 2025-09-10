import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { products } from "../../../data/products";
import { ProductCard } from "../../../components/ProductCardWithProps";
// importerer en liste med studenter fra en konstant-fil
// normalt ville dette vært en API-kall eller databaseforespørsel

// Lager denne lokalt da den ikke brukes andre steder og er spesifikk for denne komponenten
const EmptyProduct = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>Ingen produkt funnet.</Text>
      <Link href="/products" style={styles.link}>
        <Text style={styles.linkText}>Tilbake til produktlisten</Text>
      </Link>
    </View>
  );
};

export default function StudentDetailScreen() {
  // Bruk useLocalSearchParams for å hente ut ID-parameteren fra URL-en
  const { id } = useLocalSearchParams();

  // Finn produktet med den aktuelle ID-en
  const product = products.find((s) => s.id === id);

  // Håndter tilfellet der produktet ikke blir funnet
  if (!product) {
    return <EmptyProduct />;
  }

  return (
    <View style={styles.container}>
      <ProductCard product={product} />
      {/* Link tilbake til liste siden */}
      <Link href="/products" style={styles.link}>
        <Text style={styles.linkText}>Tilbake til produkter</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#002266",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    backgroundColor: "#002266",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
