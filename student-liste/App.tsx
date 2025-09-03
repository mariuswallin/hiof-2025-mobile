import type { Student } from "./components/StudentItem";

import { SafeAreaProvider } from "react-native-safe-area-context";
import StudentList from "./components/StudentList";

const students: Student[] = [
  { id: 1, name: "John Doe", age: 20 },
  { id: 2, name: "Jane Smith", age: 22 },
  { id: 3, name: "Sam Brown", age: 19 },
  { id: 4, name: "Emily Johnson", age: 21 },
  { id: 5, name: "Michael Davis", age: 23 },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <StudentList students={students} />
    </SafeAreaProvider>
  );
}
