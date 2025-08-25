import { ScrollView } from "react-native";
import StudentID from "../components/StudentID";
import type { Student, Theme } from "../types";
import Card from "./BaseCard";

type StudentListProps = {
  students: Student[];
  theme: Theme;
};

export default function StudentList(props: StudentListProps) {
  const { students, theme } = props;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 25 }}>
      {students.map((student) => (
        <Card key={student.id} theme={theme} title={student.name}>
          <StudentID student={student} theme={theme} />
        </Card>
      ))}
    </ScrollView>
  );
}
