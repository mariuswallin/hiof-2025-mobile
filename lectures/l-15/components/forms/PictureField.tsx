// components/forms/PictureField.tsx

import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, type PropsWithChildren } from "react";
import type { AnyFieldMeta } from "@tanstack/react-form";
import { FieldErrors } from "./FieldError";
import { SharedCamera } from "../shared/Camera";
import PictureView from "../shared/PictureView";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/utils/cn";
import { cssInterop } from "nativewind";

type PictureFieldProps = {
  onFieldChange: (value: string) => void; // Funksjon for å oppdatere skjemaverdien
  label: string; // Tekstlabel for feltet
  value?: string; // Nåværende bildeURI (valgfri)
  meta?: Partial<AnyFieldMeta>; // Metadata fra TanStack Form (for validering)
};

// Konfigurerer Ionicons til å fungere med NativeWind
cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});

export const PictureField = (props: PropsWithChildren<PictureFieldProps>) => {
  const { onFieldChange, value, label, meta = {} } = props;
  const [showCamera, setShowCamera] = useState(false);

  // Håndterer når et bilde er tatt eller endret
  const onSetImage = (image: string) => {
    setShowCamera(false);
    onFieldChange(image);
  };

  return (
    <>
      {/* Modal som viser kameraet når brukeren vil ta et bilde */}
      <Modal visible={showCamera} onRequestClose={() => setShowCamera(false)}>
        <SharedCamera onSetImage={onSetImage} facing="back" />
      </Modal>

      <View style={styles.container}>
        <Text className="font-bold mb-5 text-[#002266]">{label}</Text>

        {/* Betinget rendering - viser enten bildet eller en placeholder */}
        {value ? (
          <PictureView picture={value} setPicture={onSetImage} />
        ) : (
          <TouchableOpacity
            onPress={() => setShowCamera(true)}
            className={cn(
              "border-2 border-dashed border-gray-300 rounded-sm h-80 flex items-center justify-center"
            )}
          >
            <Text>
              <Ionicons name="camera" size={24} className="text-slate-400" />
            </Text>
          </TouchableOpacity>
        )}

        {/* Viser eventuelle validerings-feilmeldinger */}
        <FieldErrors meta={meta} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    zIndex: 11,
  },
});
