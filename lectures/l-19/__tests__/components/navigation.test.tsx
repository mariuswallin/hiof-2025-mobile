import {
  render,
  screen,
  waitFor,
  userEvent,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { useNavigation } from "expo-router";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const Stack = createNativeStackNavigator();

// Lager to enkle komponenter for navigasjonstesting
function ProfileScreen() {
  return (
    <View>
      <Text>Profilside</Text>
    </View>
  );
}

function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hjemmeside</Text>
      <Button
        title="Gå til profil"
        onPress={() => navigation.navigate("profile")}
      />
    </View>
  );
}

function TestApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

test("navigates to profile screen when profile button is pressed", async () => {
  render(<TestApp />);
  const homeScreen = screen.getByText("Hjemmeside");
  expect(homeScreen).toBeOnTheScreen();

  await userEvent.press(screen.getByText("Gå til profil"));

  await waitFor(() => {
    expect(screen.getByText("Profilside")).toBeOnTheScreen();
  });

  expect(screen.getByText("Profilside")).toBeOnTheScreen();
});
