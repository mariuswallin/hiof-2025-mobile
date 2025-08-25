import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Theme } from "../constants/theme";

export type CardProps = {
  children: React.ReactNode;
  title?: string;
};

export default function Card({ children, title }: CardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.header, { backgroundColor: Theme.primary }]}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        {children}
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
    height: "100%",
  },
  card: {
    width: cardWidth,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
