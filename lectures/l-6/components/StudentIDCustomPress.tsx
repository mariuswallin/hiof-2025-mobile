import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  type GestureResponderEvent,
} from "react-native";
import type { Student, Theme } from "../types";
import CustomPress from "./CustomPress";

export default function StudentIDCustomPress({
  student,
  theme,
  onPress, // Ny prop for å håndtere trykk-hendelser
}: {
  student: Student;
  theme: Theme;
  onPress?: (id: string) => void; // Valgfri callback-funksjon
}) {
  // Destrukturerer student-objektet for enklere tilgang til egenskaper
  const { id, isActive, role, name, program, expireAt } = student;
  // Destrukturerer theme-objektet for tilgang til fargene
  const { primary, secondary } = theme;
  // Sjekker om studenten er admin for betinget visning
  const isAdmin = role === "Admin";

  // Funksjon som håndterer trykk-hendelser på studentkortet
  // Tar imot en event-parameter av typen GestureResponderEvent
  // og logger hendelsen til konsollen
  const handleStudentPress = (event: GestureResponderEvent) => {
    console.log("Student card pressed event:", event);
    // Håndterer trykk-hendelsen
    if (onPress) {
      onPress(id);
    }
  };

  return (
    <CustomPress
      onPress={handleStudentPress}
      feedbackStyle={true}
      useRipple={true}
      style={[styles.container, !isActive && styles.inactiveContainer]}
    >
      <View>
        {/* Betinget visning: Vises bare hvis studenten ikke er aktiv */}
        {!isActive && <Text style={styles.inactiveLabel}>Inaktiv</Text>}
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            {/* Bruker secondary-fargen fra theme for rammen rundt bildet */}
            <Image
              source={{ uri: "https://placehold.co/100/jpg" }}
              style={[styles.image, { borderColor: secondary }]}
            />
            {/* Viser en badge med studentens rolle, med theme-farger */}
            <View style={[styles.roleTag, { backgroundColor: secondary }]}>
              <Text style={styles.roleText}>{role}</Text>
            </View>
          </View>
          {/* Bruker primary-fargen fra theme for tittelen */}
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
              {/* Betinget styling basert på admin-status og aktivitetsstatus */}
              <Text
                style={[
                  styles.value,
                  isAdmin && styles.adminText,
                  { fontWeight: isActive ? "bold" : "normal" },
                ]}
              >
                {expireAt}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.barcode} />
          <Text style={styles.idText}>ID: {id}</Text>
        </View>
      </View>
    </CustomPress>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    // Skyggeeffekt for å indikere at kortet er trykkbart
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android-spesifikk skygge
  },
  containerPressed: {
    backgroundColor: "#f0f0f0", // Lysere bakgrunnsfarge når trykket
    opacity: 0.9, // Litt gjennomsiktig når trykket
  },
  inactiveContainer: {
    opacity: 0.7, // Mer gjennomsiktig for inaktive studenter
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
