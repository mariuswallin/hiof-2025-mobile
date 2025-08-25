// app/profile.tsx

// Gjenbruker komponenten StudentID
import StudentID from "@/components/StudentID";
import { Students } from "@/constants/students";
import { useAuth } from "@/context/AuthProvider";

// Normalt sett ville vi brukt en API-kall for å hente studentene
const getStudentIdFromUser = (id?: string) => {
  if (!id) {
    return null;
  }
  return Students.find((student) => student.userId === id);
};

export default function Profile() {
  const { user } = useAuth();
  const student = getStudentIdFromUser(user?.id);
  if (!student) {
    return null;
  }
  return <StudentID student={student} />;
}
