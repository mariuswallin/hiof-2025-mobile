// app/profile.tsx

import CustomView from "@/components/CustomView";
import { QueryWrapper } from "@/components/shared/QueryWrapper";
import StudentID from "@/components/StudentID";
import { useStudentByUser } from "@/hooks/useStudent";
import { Text } from "react-native";

export default function Profile() {
  const query = useStudentByUser();
  const { data: student } = query;

  if (!student) {
    return (
      <CustomView safeArea className="flex-1">
        <Text>Ingen student-id opprettet. Ta kontakt med admin</Text>
      </CustomView>
    );
  }

  return (
    <QueryWrapper query={query}>
      <StudentID student={student} />
    </QueryWrapper>
  );
}
