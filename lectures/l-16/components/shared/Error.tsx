// components/Error.tsx

import { Text } from "react-native";
import CustomView from "../CustomView";

export default function ErrorComp({ message }: { message?: string }) {
  return (
    <CustomView className="mt-2 px-4">
      <Text className="text-red-500 text-lg ">
        {message || "Noe gikk galt"}
      </Text>
    </CustomView>
  );
}
