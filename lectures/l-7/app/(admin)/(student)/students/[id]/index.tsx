// app/(admin)/(student)/students/[id]/index.tsx

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import CustomView from "../../../../../components/CustomView";

export default function View() {
  const { id } = useLocalSearchParams();

  return (
    <CustomView safeArea style={{ flex: 1 }}>
      <Text>This is a view page for {id}</Text>
    </CustomView>
  );
}
