import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router/build/exports";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  const router = useRouter();
  return (
    <Drawer
      screenOptions={{
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 6 },
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Main" onPress={() => router.push("/main")} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Home" }}
      />
      <Drawer.Screen
        name="about"
        options={{
          headerShown: true,
          title: "About",
        }}
      />
    </Drawer>
  );
}
