import { View } from "react-native";
import { studentStyles } from "./styles";

export const StudentCard = ({ children }: { children: React.ReactNode }) => {
  return <View style={studentStyles.card}>{children}</View>;
};
