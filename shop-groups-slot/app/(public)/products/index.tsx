import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { products } from "../../../data/products";
import ProductList from "../../../components/ProductList";

export default function Products() {
  return (
    <View style={styles.container}>
      <ProductList products={products} />
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Tilbake til forsiden</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#002266",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 10,
    color: "#002266",
  },
  list: {
    width: "100%",
    marginBottom: 15,
  },
  link: {
    backgroundColor: "#002266",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
