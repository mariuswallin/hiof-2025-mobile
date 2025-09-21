import { StyleSheet, View } from "react-native";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductFormModular";
// import ProductForm from "./components/ProductForm";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <ProductForm /> */}
          <ProductForm />
          <ProductList
            products={[
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
            ]}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
