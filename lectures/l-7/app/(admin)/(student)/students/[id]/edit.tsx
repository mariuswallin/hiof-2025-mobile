// app/(admin)/(student)/students/[id]/edit.tsx

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import CustomView from "../../../../../components/CustomView";

export default function Edit() {
  const { id } = useLocalSearchParams();

  return (
    <CustomView safeArea style={{ flex: 1 }}>
      <Text>This is a edit page for {id}</Text>
    </CustomView>
  );
}
