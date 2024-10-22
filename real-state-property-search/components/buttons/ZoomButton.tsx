import React, { RefObject, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import MapView, { Camera } from "react-native-maps";

export default function ZoomButton({ mapRef }: { mapRef: RefObject<MapView> }) {
  const handleZoomIn = () => {
    mapRef.current?.getCamera().then((cam: Camera) => {
      if (Platform.OS === "android") {
        cam.zoom += 1;
      } else {
        cam.altitude /= 2;
      }
      mapRef.current?.animateCamera(cam);
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then((cam: Camera) => {
      if (Platform.OS === "android") {
        cam.zoom -= 1;
      } else {
        cam.altitude *= 2;
      }
      mapRef.current?.animateCamera(cam);
    });
  };

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
        <Text style={styles.buttonText}>Zoom In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
        <Text style={styles.buttonText}>Zoom Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    position: "absolute",
    bottom: 12,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
