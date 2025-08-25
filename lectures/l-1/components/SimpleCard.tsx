import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function StudentIDCard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>HIOF</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.image}
          />

          <Text style={styles.title}>STUDENT ID-KORT</Text>
          <Text style={styles.name}>Ola Nordmann</Text>

          <View style={styles.infoBox}>
            <Text style={styles.info}>Studentnr: 123456</Text>
            <Text style={styles.info}>Program: Informatikk</Text>
            <Text style={styles.info}>Gyldig til: 31.07.2026</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.barcode} />
          <Text style={styles.idText}>ID: 123456</Text>
        </View>
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
    padding: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    backgroundColor: "#002266",
    padding: 15,
    alignItems: "center", // Center the header text
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#002266",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#002266",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: "#f9f9f9",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  footer: {
    padding: 15,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  barcode: {
    height: 30,
    width: "70%",
    backgroundColor: "#333",
    marginBottom: 10,
  },
  idText: {
    fontSize: 12,
    color: "#666",
  },
});
