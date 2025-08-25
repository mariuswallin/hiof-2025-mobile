// app/(admin)/(student)/students/[id]/index.tsx

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import CustomView from "../../../../../components/CustomView";
import StudentID from "../../../../../components/StudentID";
import { Students } from "../../../../../constants/students";

export default function View() {
  const { id } = useLocalSearchParams();

  const student = Students.find((student) => student.id === id);
  if (!student) {
    return (
      <CustomView safeArea style={{ flex: 1 }}>
        <Text>Student not found</Text>
      </CustomView>
    );
  }

  return (
    <CustomView safeArea style={{ flex: 1 }}>
      <StudentID student={student} />
    </CustomView>
  );
}
