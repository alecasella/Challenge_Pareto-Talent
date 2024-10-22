import { View, Button, StyleSheet, Modal, Image, Text } from "react-native";

export default function PropertyDetail(props) {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Image style={styles.image} source={props.source} />
        <Text>Description: {props.description}</Text>
        <Text>Price: {props.price}</Text>
        <Text>City: {props.place}</Text>
        <View style={styles.button}>
          <Button
            title="Go back"
            onPress={props.handleCloseModal}
            color="#f31282"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    marginHorizontal: 20,
    marginVertical: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    width: 150,
    marginTop: 20,
    borderRadius: 8,
  },
});
