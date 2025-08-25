// app/(admin)/(student)/students/[id]/edit.tsx

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import CustomView from "@/components/CustomView";
import { Students } from "@/constants/students";
import StudentID from "@/components/StudentID";

export default function Edit() {
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
