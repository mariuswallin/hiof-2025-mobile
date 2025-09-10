import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Home from "../components/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til Shop-appen!</Text>
      <Text style={styles.subtitle}>
        Utforsk våre fantastiske produkter og tilbud.
      </Text>
      <View style={styles.linkContainer}>
        <Link href="/about" style={styles.link}>
          <Text style={styles.linkText}>Om appen</Text>
        </Link>

        <Link href="/products" style={styles.link}>
          <Text style={styles.linkText}>Se alle produkter</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "#002266",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  linkContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  link: {
    backgroundColor: "#002266",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
