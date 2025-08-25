// components/Error.tsx

import { Text } from "react-native";
import CustomView from "../CustomView";
import { Link } from "expo-router";

export default function ErrorComp({
  message,
  href,
}: {
  message?: string;
  href?: string;
}) {
  return (
    <CustomView className="mt-2 px-4">
      <Text className="text-red-500 text-lg ">
        {message || "Noe gikk galt"}
      </Text>
      <Link href={href || "/"}>Tilbake til hjem</Link>
    </CustomView>
  );
}
