// components/FloatingButton.tsx

// PropsWithChildren er en generisk type som gir oss children-propene
import React, { type PropsWithChildren } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

// Importerer en egendefinert trykk-håndteringskomponent
import CustomPress from "./CustomPress";
import { Theme } from "../constants/theme";

type FloatingButtonProps = {
  onPress?: () => void; // Funksjon som kjøres når knappen trykkes (valgfri)
  size?: number; // Knappens størrelse i piksler (valgfri)
  color?: string; // Knappens bakgrunnsfarge (valgfri)
  style?: ViewStyle; // Ekstra stiler for knappen (valgfri)
};

export function FloatingButton({
  onPress,
  size = 60, // Standardstørrelse hvis ikke spesifisert
  color = "#D41A1A", // Standardfarge hvis ikke spesifisert
  children, // Innholdet som skal vises i knappen (f.eks. et ikon)
  style, // Ekstra stiler
}: PropsWithChildren<FloatingButtonProps>) {
  // Hjelpefunksjon for å håndtere trykk - sjekker om onPress-funksjonen eksisterer
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  // Hvis ingen onPress-funksjon er angitt, vis bare en statisk knapp uten trykk-funksjonalitet
  if (!onPress) {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.button,
            {
              width: size, // Dynamisk størrelse basert på props
              height: size, // Samme høyde som bredde for en perfekt sirkel
              borderRadius: size / 2, // Halvparten av størrelsen for å lage en sirkel
              backgroundColor: color, // Dynamisk farge basert på props
            },
            ...(style ? [style] : []), // Legger til ekstra stiler hvis de finnes
          ]}
        >
          {children}
        </View>
      </View>
    );
  }

  // Hvis onPress-funksjonen er angitt, brukes CustomPress
  return (
    <View style={styles.container}>
      <CustomPress
        onPress={handlePress}
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
          ...(style ? [style] : []),
        ]}
        feedbackStyle={true} // Aktiverer visuell feedback ved trykk
        useRipple={true} // Aktiverer ripple-effekt ved trykk
      >
        {children}
      </CustomPress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Absolutt posisjonering så knappen kan "flyte" over annet innhold
    bottom: 0, // Plasserer knappen nederst
    right: 0, // Plasserer knappen til høyre
    zIndex: 999, // Høy zIndex sikrer at knappen vises over andre elementer
    borderColor: Theme.gray, // Border-farge fra tema
    borderWidth: 8, // Tykkelse på border
    borderRadius: 999, // Høy verdi for å sikre rund form uansett størrelse
  },
  button: {
    justifyContent: "center", // Sentrerer innholdet vertikalt
    alignItems: "center", // Sentrerer innholdet horisontalt
    elevation: 5, // Android-spesifikk skygge
    shadowColor: "#000", // iOS-skygge egenskaper
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
