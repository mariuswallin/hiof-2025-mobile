import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import type { Student } from "../types";
import { Theme } from "../constants/theme";
import { format } from "@/utils/date";

export default function StudentID({ student }: { student: Student }) {
  const { id, isActive, name, program, expireAt } = student;
  const { primary, secondary } = Theme;

  return (
    <View style={{ backgroundColor: Theme.background, flex: 1 }}>
      <View>
        {!isActive && <Text style={styles.inactiveLabel}>Inaktiv</Text>}
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://placehold.co/100/jpg" }}
              style={[styles.image, { borderColor: secondary }]}
            />
          </View>
          <Text style={[styles.title, { color: primary }]}>STUDENT ID</Text>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Studentnr:</Text>
              <Text style={styles.value}>{id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Program:</Text>
              <Text style={styles.value}>{program}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Gyldig til:</Text>
              <Text
                style={[
                  styles.value,
                  { fontWeight: isActive ? "bold" : "normal" },
                ]}
              >
                {format(new Date(expireAt))}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.barcode} />
          <Text style={styles.idText}>ID: {id}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inactiveLabel: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    color: "white",
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    textTransform: "uppercase",
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
