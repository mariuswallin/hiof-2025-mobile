// components/shared/PictureView.tsx

import { Image } from "expo-image";
import { Alert } from "react-native";
import { saveToLibraryAsync } from "expo-media-library";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import type { CameraType } from "expo-camera";

// Definerer proptypene for denne komponenten
interface PictureViewProps {
  type?: CameraType; // Kameraet som brukes (front eller bak)
  picture: string; // URI til bildet som skal vises
  setPicture: (value: string | null) => void; // Funksjon for å oppdatere bildestien
}

export default function PictureView({
  picture,
  setPicture,
  type = "back",
}: PictureViewProps) {
  return (
    // Animated.View for å få fade-effekter og smooth overganger
    <Animated.View
      layout={LinearTransition} // Smooth overganger ved layoutendringer
      entering={FadeIn} // Fade inn-animasjon
      exiting={FadeOut} // Fade ut-animasjon
      className={"h-96 relative w-full"}
    >
      {/* Knapp for å lagre bildet til mediebiblioteket */}
      <Ionicons
        onPress={async () => {
          // Bruker expo-media-library for å lagre bildet
          await saveToLibraryAsync(picture);
          // Viser en enkel bekreftelsesmelding
          Alert.alert("✅ Picture saved!");
        }}
        name={"arrow-down"}
        size={36}
        color={"#002266"}
        className="absolute top-2 left-2 z-10"
      />

      {/* Knapp for å lukke bildevisningen */}
      <Ionicons
        onPress={async () => {
          setPicture(null); // Setter bildestien til tom streng
        }}
        name={"close-circle-outline"}
        size={36}
        color={"red"}
        className="absolute top-2 right-2 z-10"
      />

      {/* Viser selve bildet med expo-image */}
      <Image
        source={picture}
        contentFit="cover"
        style={[
          {
            height: "100%",
            width: "100%",
          },
          type === "front"
            ? { transform: [{ scaleX: -1 }] } // Speilvender bildet horisontalt
            : {}, // Ingen speilvending for bakkamera
        ]}
      />
    </Animated.View>
  );
}
