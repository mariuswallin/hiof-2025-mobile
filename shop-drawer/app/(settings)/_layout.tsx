import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "User",
          title: "Profile",
        }}
      />
    </Drawer>
  );
}
