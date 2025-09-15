import type { Student } from "./components/StudentItem";

import { SafeAreaProvider } from "react-native-safe-area-context";
import StudentList from "./components/StudentList";
import { useState } from "react";

const students: Student[] = [
  { id: 1, name: "John Doe", age: 20 },
  { id: 2, name: "Jane Smith", age: 22 },
  { id: 3, name: "Sam Brown", age: 19 },
  { id: 4, name: "Emily Johnson", age: 21 },
  { id: 5, name: "Michael Davis", age: 23 },
];

export default function App() {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const filterStudents = (query?: string) => {
    if (!query || query.length === 0) {
      setFilteredStudents(students);
      return;
    }
    console.log("Filtering students with query:", query);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <SafeAreaProvider>
      <StudentList
        students={filteredStudents}
        filterStudents={filterStudents}
      />
    </SafeAreaProvider>
  );
}
