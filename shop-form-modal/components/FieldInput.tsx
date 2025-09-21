import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  type ViewStyle,
  type TextStyle,
} from "react-native";

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <Text style={errorStyles.errorText}>{error}</Text>;
}

const errorStyles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

interface FieldInputProps extends TextInputProps {
  label?: string;
  styles: {
    container?: ViewStyle;
    label?: TextStyle;
    input?: TextStyle;
  };
  children?: React.ReactNode;
}

export default function FieldInput({
  label,
  styles,
  children,
  ...textInputProps
}: FieldInputProps) {
  const containerStyle = StyleSheet.flatten([
    baseStyles.container,
    styles.container,
  ]);

  const labelStyle = StyleSheet.flatten([baseStyles.label, styles.label]);
  const inputStyle = StyleSheet.flatten([baseStyles.input, styles.input]);

  return (
    <View style={[containerStyle]}>
      {label && <Text style={[labelStyle]}>{label}</Text>}
      <TextInput {...textInputProps} style={[inputStyle]} />
      {children}
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#002266",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    color: "#002266",
  },
});
