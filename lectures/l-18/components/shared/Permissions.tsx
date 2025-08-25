import { useCameraPermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tar i mot en route som parameter, for å kunne
// navigere til riktig skjerm etter at vi har fått tillatelse
// Bestemmes fra utsiden som bruker komponenten
export function Permissions({ route }: { route: string }) {
  // Henter tillatelse for kamera og mediebibliotek via innebygde hooks
  // fra expo
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [libraryPermission, requestMediaLibraryPermission] = usePermissions();
  const allPermissionsGranted =
    cameraPermission?.granted && libraryPermission?.granted;

  const handleContinue = async () => {
    const allPermissionsGranted = await requestAllPermissions();
    if (allPermissionsGranted) {
      // navigate to add
      router.replace(route);
    } else {
      Alert.alert("To continue please provide permissions in settings");
    }
  };

  // Sjekker alle tillatelser og lagrer i AsyncStorage
  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permission is required.");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permission is required.");
      return false;
    }

    // Sikrer at vi kun spør om dette en gang
    await AsyncStorage.setItem("permissionsGranted", "true");
    return true;
  }

  return (
    <View className="p-5 flex-1 gap-5">
      {!cameraPermission?.granted ? (
        <View>
          <Text>We need your permission to use the camera</Text>
          <TouchableOpacity onPress={requestCameraPermission}>
            <Text className="bg-blue-500 p-2 py-4 text-white rounded text-center font-bold my-2">
              Grant camera permission
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {!libraryPermission?.granted ? (
        <View>
          <Text>We need your permission to use the library</Text>
          <TouchableOpacity onPress={requestMediaLibraryPermission}>
            <Text className="bg-blue-500 p-2 py-4 text-white rounded text-center font-bold my-2">
              Grant library permission
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <Button
        title="Continue"
        disabled={!allPermissionsGranted}
        onPress={handleContinue}
      />
    </View>
  );
}
