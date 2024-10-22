import { Platform, StyleSheet, View } from "react-native";
import MapView from "./components/mapview/MapView";
import { useEffect, useState } from "react";
import CityPicker from "./components/picker/CityPicker";
import Property from "./model/Property";

export default function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          Platform.OS === "android"
            ? "http://10.0.2.2:8080/properties"
            : "http://localhost:8080/properties"
        );

        const data = await response.json();

        const propertyInstances = data.map((item: any) => new Property(item));

        setProperties(propertyInstances);
      } catch (error) {
        throw new Error("Could not fetch properties data!");
      }
    };

    fetchData();
  }, []);

  function handleCityChange(city: string) {
    setSelectedCity(city);
  }

  return (
    <View style={styles.container}>
      {properties.length !== 0 && (
        <CityPicker
          properties={properties}
          handleCityChange={handleCityChange}
        />
      )}
      {properties.length !== 0 && (
        <MapView properties={properties} currentCity={selectedCity} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
});
