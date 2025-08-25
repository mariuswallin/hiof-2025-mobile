// /components/shared/Camera.tsx

import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SymbolView } from "expo-symbols";
import { CameraView, type CameraRatio, type CameraType } from "expo-camera";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

// Definerer proptypene for komponenten vår
type CameraProps = {
  onSetImage: (image: string) => void; // En funksjon som tar imot en bildesti
  ratio?: CameraRatio; // Størrelsesforhold for kameravisningen (valgfri)
  zoom?: number; // Zoom-nivå (valgfri)
  facing?: CameraType; // Hvilken kamera som brukes (front/bak) (valgfri)
};

export function SharedCamera(props: CameraProps) {
  // Destrukturerer props med standardverdier
  const { onSetImage, ratio = "1:1", zoom = 0.1, facing = "front" } = props;

  // Oppretter en referanse til kamerakomponenten// Dette lar oss kalle metoder på CameraView direkte
  const cameraRef = React.useRef<CameraView>(null);

  // Funksjon for å ta et bilde
  async function handleTakePicture() {
    // Bruker referansen til å ta et bilde
    const response = await cameraRef.current?.takePictureAsync({
      quality: 0.8, // Setter bildekvaliteten til 80%
    });
    if (!response) return; // Returnerer hvis vi ikke fikk noe svar// Sender bildestien tilbake til foreldrekomponenten
    onSetImage(response.uri);
  }

  return (
    // Animated.View er en del av react-native-reanimated
    // Den lar oss animere komponenter med ulike effekter
    <Animated.View
      layout={LinearTransition} // Smooth overgang ved layoutendringer
      entering={FadeIn.duration(1000)} // Fade inn-animasjon når komponenten vises
      exiting={FadeOut.duration(1000)} // Fade ut-animasjon når komponenten fjernes
      className={
        "flex-1 top-0 left-0 right-0 bottom-0 absolute z-40 h-full w-full justify-center items-center bg-black"
      }
    >
      {/* CameraView er hovedkomponenten fra expo-camera */}
      <CameraView
        ref={cameraRef} // Kobler referansen vår til komponenten
        style={{
          flex: 1,
          width: "100%",
          maxHeight: 400,
        }}
        ratio={ratio} // Størrelsesforhold (f.eks. "1:1", "16:9")
        zoom={zoom} // Zoom-nivå (0-1)
        facing={facing} // Hvilken kamera (front/bak)
        mode={"picture"} // Modus (bilde/video)
      />

      {/* Knapp for å ta bilde */}
      <TouchableOpacity
        onPress={handleTakePicture}
        className="absolute bottom-20 w-16 h-16 rounded-full bg-blue-300 justify-center items-center"
      >
        {/* SymbolView fra expo-symbols - fungerer best på iOS */}
        <SymbolView
          name={"circle"} // Navn på SF Symbol
          size={90} // Størrelse
          type="hierarchical" // Type symbol (fargestil)
          tintColor={"white"} // Farge
          animationSpec={{
            // Animasjonsinnstillinger
            effect: {
              type: "bounce", // Spretteffekt
            },
            repeating: false, // Ikke gjenta animasjonen
          }}
          fallback={
            // Fallback for Android/Web
            <TouchableOpacity
              onPress={handleTakePicture}
              style={{
                width: 90,
                height: 90,
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{"📷"}</Text>
            </TouchableOpacity>
          }
        />
      </TouchableOpacity>

      {/* Lukk-knapp */}
      <TouchableOpacity
        onPress={() => onSetImage("")} // Sender tom streng for å indikere ingen bilde
        className="absolute top-10 right-10"
      >
        <SymbolView
          name={"x.circle.fill"} // X-symbol
          size={45}
          type="hierarchical"
          tintColor={"white"}
          animationSpec={{
            effect: {
              type: "bounce",
            },
            repeating: false,
          }}
          fallback={
            // Fallback for ikke-iOS plattformer
            <TouchableOpacity
              onPress={() => onSetImage("")}
              style={{
                width: 90,
                height: 90,
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>x</Text>
            </TouchableOpacity>
          }
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
