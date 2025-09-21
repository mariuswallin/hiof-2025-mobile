import { View, StyleSheet, Text } from "react-native";

import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/(settings)" style={styles.link}>
        <Text>Go to settings</Text>
      </Link>
      <Link href="/(admin)" style={styles.link}>
        <Text>Go to admin</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#002266",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#333",
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
