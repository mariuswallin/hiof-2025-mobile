import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StudentIDCardSimple() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>STUDENT ID</Text>
        <Text style={styles.name}>Ola Nordmann</Text>
        <Text style={styles.info}>Studentnr: 123456</Text>
        <Text style={styles.info}>Program: Informatikk</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Defines the shadow effect on Android
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
    color: "#002266",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
});
