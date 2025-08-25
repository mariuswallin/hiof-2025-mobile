// app/(admin)/(student)/students/[id]/remove.tsx

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import CustomView from "../../../../../components/CustomView";

export default function Remove() {
  const { id } = useLocalSearchParams();

  return (
    <CustomView safeArea style={{ flex: 1 }}>
      <Text>This is a remove page for {id}</Text>
    </CustomView>
  );
}
