import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Back"
        icon={() => <Ionicons name="arrow-back" />}
        onPress={() => router.dismissAll()}
      />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} />
    </GestureHandlerRootView>
  );
}
