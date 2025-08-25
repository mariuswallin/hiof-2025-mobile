import { SafeAreaView, StyleSheet } from "react-native";
import StudentList from "./components/StudentList";
import StudentFlatList from "./components/StudentFlatList";

const Theme = {
  primary: "#002266",
  secondary: "#004499",
  text: "#333333",
  background: "#ffffff",
};

const students = [
  {
    id: "123456",
    name: "Lars Larsen",
    program: "Informatikk",
    expireAt: "2025-12-31",
    role: "Student",
    isActive: true,
  },
  {
    id: "654321",
    name: "Sara Hansen",
    program: "Informatikk",
    expireAt: "2025-12-31",
    role: "Student",
    isActive: false,
  },
  {
    id: "789012",
    name: "Ali Khan",
    program: "Informatikk",
    expireAt: "2025-12-31",
    role: "Admin",
    isActive: true,
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StudentFlatList students={students} theme={Theme} />
      {/* <StudentList students={students} theme={Theme} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.background,
  },
});
