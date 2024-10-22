export class Address {
  readonly latitude: number;
  readonly longitude: number;
  readonly latitudeDelta: number;
  readonly longitudeDelta: number;
  readonly place: string;

  constructor(latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number, place: string) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.latitudeDelta = latitudeDelta;
    this.longitudeDelta = longitudeDelta;
    this.place = place;
  }
}