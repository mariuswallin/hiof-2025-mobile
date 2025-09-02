import { Text } from "react-native";
import { studentStyles } from "./styles";

export interface Student {
  id: number;
  name: string;
  age: number;
}

export default function StudentItem({ student }: { student: Student }) {
  return <Text style={studentStyles.title}>{JSON.stringify(student)}</Text>;
}
