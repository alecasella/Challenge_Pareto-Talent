import { Address } from "./Address";
import { ImageSourcePropType } from "react-native";

interface PropertyProps {
  id: number;
  address: Address;
  description: string;
  image: string;
  price: number;
}

export default class Property {
  readonly id: number;
  readonly address: Address;
  readonly description: string;
  readonly image: string;
  readonly price: number;

  constructor(object: PropertyProps) {
    this.id = object.id;
    this.address = object.address;
    this.description = object.description;
    this.image = object.image;
    this.price = object.price;
  }
}