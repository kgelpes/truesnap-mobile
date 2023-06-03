import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CircleButton from "../components/CircleButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from "react-native-vision-camera";

export default function App() {
  const devices = useCameraDevices();
  const device = devices.back;
  const [cameraPermission, setCameraPermission] = useState<
    CameraPermissionStatus | undefined
  >();

  useEffect(() => {
    const updateCurrentStatus = async () => {
      const currentCameraPermissionStatus =
        await Camera.getCameraPermissionStatus();
      setCameraPermission(currentCameraPermissionStatus);
    };
    updateCurrentStatus();
  }, []);

  useEffect(() => {
    const getAvailableCameraDevices = async () => {
      const aval = await Camera.getAvailableCameraDevices();
      console.log(aval);
    };
    getAvailableCameraDevices();
  }, []);

  const onRequestPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    if (newCameraPermission !== "authorized") {
      alert(
        "We need your permission to show the camera. Please go to your settings and enable camera permissions for TrueSnap."
      );
    }
  };

  if (!cameraPermission || !device) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (cameraPermission !== "authorized") {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={onRequestPermission} title="grant permission" />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => console.log("flash")}>
          <Ionicons name="flash-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          TrueSnap
        </Text>
        <TouchableOpacity onPress={() => console.log("account")}>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Camera
        style={{
          width: "100%",
          aspectRatio: 3 / 4,
          borderRadius: 12,
        }}
        device={device}
        isActive={true}
        preset="photo"
        enableHighQualityPhotos
        enableZoomGesture
        photo
      />

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => console.log("gallery")}>
          <Ionicons name="images-outline" size={24} color="white" />
        </TouchableOpacity>
        <CircleButton
          onPress={() =>
            console.log(
              device?.formats.find((f) => f.isHighestPhotoQualitySupported)
            )
          }
        />
        <TouchableOpacity onPress={() => console.log("switch to front camera")}>
          <Ionicons name="sync-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  camera: {
    aspectRatio: 3 / 4,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
