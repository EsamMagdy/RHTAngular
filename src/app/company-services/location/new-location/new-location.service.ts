import { MapsAPILoader } from '@agm/core';
import { Component, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ContractStepsEnum, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { LocationService } from '../location.service';
import { NewLocation } from './new-location.model';
@Injectable()
export class NewLocationService {
  geoCoder: any;
  containPosition = false;
  location = new NewLocation();
  paths: {
    lat: number;
    lng: number;
  }[] = [];
  constructor(private mapsAPILoader: MapsAPILoader,
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService,
    private locationService: LocationService,
    private router: Router,) { }
  mapReadyHandler(map: google.maps.Map) {
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('ChangeLocation')
    );
    let mapClickListener = map.addListener(
      'click',
      (e: google.maps.MouseEvent) => {
        // this.currentLocationError = false;
        if (this.location.paths && this.location.paths.length > 0) {
          // this.mapError = true;
          alert('asd');
          return;
        }
        this.location.markerLatitude = e.latLng.lat();
        this.location.markerLongitude = e.latLng.lng();
        this.location.showMarker = true;
      }
    );
  }

  checkIfUserLogged() { }

  async setCurrentLocation() {
    let isContainPosition = await this.mapsAPILoader
      .load()
      .then(() => this.IsBoundryContainsCurrentPosition());
    return this.containPosition;
  }
  IsBoundryContainsCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(15, 34), //south west
          new google.maps.LatLng(34, 57) //north east
        );

        if (
          !bounds.contains(
            new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          )
        ) {
          this.containPosition = false;
          return;
        }
        this.containPosition = true;
        return;
      });
    }
    // this.geoCoder = new google.maps.Geocoder();
  }
  async checkIfCurrentLocationInPolygin(
    paths: {
      lat: number;
      lng: number;
    }[]
  ) {
    let checkCurrentLocation = await this.mapsAPILoader.load().then(() => this.checkCurrentLocation(paths));

    return this.location;
  }

  checkCurrentLocation(paths: {
    lat: number;
    lng: number;
  }[]) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(15, 34), //south west
          new google.maps.LatLng(34, 57) //north east
        );
        // this.checkIfCurrentLocationInPolygin(position);
        if (paths && paths.length == 0) {
          this.location = this.setCurrentLocationMarker(position);
        }
        const bermudaTriangle = new google.maps.Polygon({
          paths: paths,
        });
        const latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const resultColor = google.maps.geometry.poly.containsLocation(
          latLng,
          bermudaTriangle
        );
        if (resultColor) {
          this.location = this.setCurrentLocationMarker(position);
        } else {
          this.location = null;
        }
      });
    }
    // this.geoCoder = new google.maps.Geocoder();
  }
  setCurrentLocationMarker(position: GeolocationPosition) {
    this.location.latitude = position.coords.latitude;
    this.location.longitude = position.coords.longitude;
    this.location.markerLatitude = position.coords.latitude;
    this.location.markerLongitude = position.coords.longitude;
    this.location.showMarker = true;
    this.location.zoom = 12;

    return this.location;
  }
  setNewLocationModel(
    triangleCoords: {
      lat: number;
      lng: number;
    }[]
  ) {
    if (!triangleCoords) {
      this.location.latitude = 24.7136;
      this.location.longitude = 46.6753;
      this.location.paths = [];
      this.location.address = null;
    } else {
      this.location.latitude = triangleCoords[0].lat;
      this.location.longitude = triangleCoords[triangleCoords.length - 1].lng;
      this.location.paths = triangleCoords;
    }
    this.location.showMap = true;
    this.location.showMarker = true;
    this.location.zoom = 12;

    return this.location;
  }

  onPolygonClick(event: google.maps.PolyMouseEvent) {
    this.location.locationOutsideTheNeighborhoodEM = false;
    this.location.currentLocationOutsideTheNeighborhoodEM = false;
    this.location.currentLocationOutOfBoundsEM = false;
    this.location.showMarker = true;
    this.location.markerLatitude = event.latLng.lat();
    this.location.markerLongitude = event.latLng.lng();

    return this.location;
  }

  pricingPage(value: any) {
    let location = {
      ...value,
      mLatitude: this.location.markerLatitude,
      mLongitude: this.location.markerLongitude,
    };
    this.individualContractService.setLoactionData(location);
    let user = this.localStorageService.userLocalStorage;
    if (user)
      this.locationService.addNewLocation(location, user.crmUserId).subscribe();

    let stepId = this.individualContractService.individualContractReq.stepId;

    // this.individualContractService.step.next(2);
    this.individualContractService.step.next(ContractStepsEnum.ThirdStep);

    this.individualContractService.updateStepData(
      ContractStepsEnum.ThirdStep,
      StepTypeEnum.Next
    );

    this.router.navigate(['/services/pricing'], {
      queryParams: {
        stepId: stepId,
      },
    });
  }

}
