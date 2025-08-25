// app/(admin)/(students)/students.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import StudentListItem from "../../../components/StudentListItem";
import { Students as StudentData } from "../../../constants/students";
import CustomView from "../../../components/CustomView";
import { Theme } from "../../../constants/theme";

export default function Students() {
  return (
    <CustomView safeArea className="flex-1 align-center bg-gray-200 p-5">
      <Text style={styles.title}>Studentliste</Text>
      <View style={styles.list}>
        {StudentData.map((student) => (
          <Link key={student.id} href={`/students/${student.id}`}>
            <StudentListItem student={student} />
          </Link>
        ))}
      </View>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.background,
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
