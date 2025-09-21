import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductFormModular";
// import ProductForm from "./components/ProductForm";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import type { Product } from "./types";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([
    {
      name: "Produkt 1",
      price: 100,
      description: "Dette er produkt 1",
      id: "1",
    },
    {
      name: "Produkt 2",
      price: 200,
      description: "Dette er produkt 2",
      id: "2",
    },
    {
      name: "Produkt 3",
      price: 300,
      description: "Dette er produkt 3",
      id: "3",
    },
    {
      name: "Produkt 4",
      price: 400,
      description: "Dette er produkt 4",
      id: "4",
    },
  ]);

  const onSubmit = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    setIsVisible(false);
  };
  return (
    <>
      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ProductForm onSubmit={onSubmit} />
            <Pressable onPress={() => setIsVisible(false)}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Pressable onPress={() => setIsVisible(true)}>
              <Text>Add product</Text>
            </Pressable>
            {/* <ProductForm /> */}

            <ProductList products={products} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
