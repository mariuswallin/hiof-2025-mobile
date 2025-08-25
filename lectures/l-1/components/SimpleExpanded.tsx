import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const student = {
  id: "123456",
  name: "Ola Nordmann",
  program: "Informatikk",
  expireAt: "31.07.2026",
  role: "Student",
  isActive: true,
};

const colors = {
  primary: "#002266",
  secondary: "#004499",
  text: "#333333",
  background: "#ffffff",
};

export default function StudentIDCardExpanded() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.headerText}>HIOF</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://placehold.co/100/jpg" }}
              style={[styles.image, { borderColor: colors.secondary }]}
            />
            <View
              style={[styles.roleTag, { backgroundColor: colors.secondary }]}
            >
              <Text style={styles.roleText}>{student.role}</Text>
            </View>
          </View>
          <Text style={[styles.title, { color: colors.primary }]}>
            STUDENT ID
          </Text>
          <Text style={styles.name}>{student.name}</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Studentnr:</Text>
              <Text style={styles.value}>{student.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Program:</Text>
              <Text style={styles.value}>{student.program}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Gyldig til:</Text>
              <Text
                style={[
                  styles.value,
                  student.role === "Admin" && styles.adminText,
                  { fontWeight: student.isActive ? "bold" : "normal" },
                ]}
              >
                {student.expireAt}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.barcode} />
          <Text style={styles.idText}>ID: {student.id}</Text>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: cardWidth,
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
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  adminText: {
    color: "red",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
  },
  roleTag: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  roleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
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
  infoRow: {
    position: "relative",
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: 80,
    fontWeight: "bold",
    fontSize: 14,
  },
  value: {
    flex: 1,
    fontSize: 14,
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
