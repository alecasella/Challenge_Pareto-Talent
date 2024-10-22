import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Property from "../../model/Property";

export default function CityPicker({
  properties,
  handleCityChange,
}: {
  properties: Property[];
  handleCityChange: (city: string) => void;
}) {
  const [selectedCity, setSelectedCity] = useState("");

  const places = properties.map((property) => property.address.place);

  const availableCities = Array.from(new Set(places));

  function handleValueChange(itemValue: string) {
    setSelectedCity(itemValue);
    handleCityChange(itemValue);
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue, itemIndex) => handleValueChange(itemValue)}
      >
        {availableCities.map((city) => (
          <Picker.Item label={city} value={city} key={city} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 8,
  },
});
