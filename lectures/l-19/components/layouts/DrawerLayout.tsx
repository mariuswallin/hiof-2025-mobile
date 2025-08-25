// components/layouts/DrawerLayout.tsx

import ImagePickerDrawer from "@/components/ImagePicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

import { useWindowDimensions } from "react-native";
import { useFormContext } from "@/context/FormContextReducer";

export default function AddLayout() {
  const dimensions = useWindowDimensions();
  const { state, dispatch } = useFormContext();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <ImagePickerDrawer
            {...props}
            onImageSelect={(uri) => {
              dispatch({
                type: "SET_IMAGE",
                payload: uri,
              });
            }}
            selectedImage={state.data?.image}
          />
        )}
        screenOptions={{
          drawerActiveTintColor: "#0d6c9a",
          drawerType: dimensions.width > 768 ? "permanent" : "front",
          headerShown: false,
        }}
      />
    </GestureHandlerRootView>
  );
}
