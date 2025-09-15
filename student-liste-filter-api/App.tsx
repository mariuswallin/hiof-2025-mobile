import type { Student } from "./components/StudentItem";

import { SafeAreaProvider } from "react-native-safe-area-context";
import StudentList from "./components/StudentList";
import { useState } from "react";
import { Pressable, Text } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError("Kunne ikke laste studenter");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const filterStudents = (query?: string) => {
    if (!query || query.length === 0) {
      setStudents(students);
      return;
    }
    console.log("Filtering students with query:", query);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(query.toLowerCase())
    );
    setStudents(filtered);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStudents();
  };

  return (
    <SafeAreaProvider>
      <Pressable
        onPress={fetchStudents}
        style={{
          padding: 10,
          backgroundColor: "lightblue",
          marginTop: 60,
          borderRadius: 5,
          width: "90%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text>Hent studenter</Text>
      </Pressable>
      <StudentList
        students={students}
        filterStudents={filterStudents}
        refresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
    </SafeAreaProvider>
  );
}
