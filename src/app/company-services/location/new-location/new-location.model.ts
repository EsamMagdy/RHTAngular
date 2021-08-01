export class NewLocation {
  latitude: number;
  longitude: number;
  showMarker: boolean;
  markerLatitude: number;
  markerLongitude: number;
  locationOutsideTheNeighborhoodEM: boolean;
  currentLocationOutsideTheNeighborhoodEM: boolean;
  currentLocationOutOfBoundsEM: boolean;
  zoom: number;
  showMap: boolean;
  address: string;
  showApartmentNumber: boolean;
  paths: {
    lat: number;
    lng: number;
  }[];
  submitted: boolean;
}
