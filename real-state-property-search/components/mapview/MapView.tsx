import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import CustomMapView, { Marker, Callout } from "react-native-maps";
import Property from "../../model/Property";
import ZoomButton from "../buttons/ZoomButton";
import PropertyDetail from "../modal/PropertyDetail";
import { WebView } from "react-native-webview";

export default function MapView({
  properties,
  currentCity,
}: {
  properties: Property[];
  currentCity: string;
}) {
  const mapRef = useRef<CustomMapView>(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    if (mapRef.current && properties.length) {
      const targetProperty = currentCity
        ? properties.find((p) => p.address.place === currentCity)
        : properties[0];

      if (targetProperty) {
        mapRef.current.animateToRegion({
          longitude: targetProperty.address.longitude,
          latitude: targetProperty.address.latitude,
          latitudeDelta: targetProperty.address.latitudeDelta,
          longitudeDelta: targetProperty.address.longitudeDelta,
        });
      }
    }
  }, [properties, currentCity]);

  function handleCalloutOnPress(property: Property) {
    setSelectedProperty(property);
    setModalIsVisible(true);
  }

  function handleCloseModal() {
    setModalIsVisible(false);
    setSelectedProperty(null);
  }

  function handleImageUrl(imagePath: string) {
    const uri =
      Platform.OS === "android"
        ? `http://10.0.2.2:8080/${imagePath}`
        : `http://localhost:8080/${imagePath}`;

    return { uri };
  }

  return (
    <>
      <View style={styles.container}>
        <CustomMapView style={StyleSheet.absoluteFillObject} ref={mapRef}>
          {properties.map((property) => (
            <Marker
              key={property.id}
              coordinate={{
                latitude: property.address.latitude,
                longitude: property.address.longitude,
              }}
            >
              <Callout tooltip onPress={() => handleCalloutOnPress(property)}>
                <View style={styles.callout}>
                  {Platform.OS === "ios" ? (
                    <Image
                      style={styles.image}
                      source={handleImageUrl(property.image)}
                      resizeMode="cover"
                    />
                  ) : (
                    <WebView
                      style={styles.image}
                      originWhitelist={["*"]}
                      source={{
                        html: `<html><body style="margin:0;padding:0;"><img src="${
                          handleImageUrl(property.image).uri
                        }" style="width:100%;height:100%;object-fit:cover;" /></body></html>`,
                      }}
                      scrollEnabled={false}
                    />
                  )}
                  <Text style={styles.address}>{property.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </CustomMapView>
      </View>
      <ZoomButton mapRef={mapRef} />

      {selectedProperty && (
        <PropertyDetail
          visible={modalIsVisible}
          source={handleImageUrl(selectedProperty.image)}
          description={selectedProperty.description}
          place={selectedProperty.address.place}
          price={selectedProperty.price}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === "android" ? 7 : 3,
    width: "100%",
    height: "100%",
    marginBottom: Platform.OS === "android" ? 50 : 0,
  },
  callout: {
    width: 200,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
