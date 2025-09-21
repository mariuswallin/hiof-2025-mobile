import { Text, View, StyleSheet, Button, FlatList } from "react-native";

function MyCustomComponent() {
  return (
    <View style={styles.container}>
      <Text>This is my custom component!</Text>
    </View>
  );
}

// <SoFar text="a product list" />
/* <SoFar text="a product list">
   <Text>Item 1</Text>
   <Text>Item 2</Text>
   <Text>Item 3</Text>
</SoFar> */

export default function SoFar({
  text,
  onButtonPress,
  children,
}: {
  text: string;
  onButtonPress: (value: string) => void;
  children?: React.ReactNode;
}) {
  const myList = ["Item 1", "Item 2", "Item 3"];
  const handlePress = () => {
    console.log("Button was pressed!");
    onButtonPress("Button pressed in SoFar component");
  };

  return (
    <View>
      <Text>So far, we have built: {text}</Text>
      <Button title="Press me" onPress={handlePress} />
      {myList.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
      <FlatList
        data={myList}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item) => item}
      />
      <MyCustomComponent />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
