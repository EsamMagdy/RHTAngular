import { Languages } from './../../../shared/models/languages.model';
import { LocalStorageService } from './../../../shared/services/localStorage.service';
import {
  StepTypeEnum,
  IndividualContractReq,
  HousingType,
} from './../../../shared/models/individualContractReq.model';
import { AuthService } from 'src/app/auth/auth.service';
import { TranslationData } from './../../../shared/models/application/translation.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/models/city.model';
import { District } from 'src/app/shared/models/district.model';
import { KeyValuePairs } from 'src/app/shared/models/keyValuePairs.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { LocationService } from '../location.service';
import { LocationFormData } from '../locationForm.model';
import { User } from 'src/app/shared/models/user.model';
import { ContractStepsEnum } from 'src/app/shared/models/individualContractReq.model';
import { FooterLoaderService } from 'src/app/shared/services/footerLoaderAfterView.service';
import { ContactPreviousLocation } from 'src/app/shared/models/contactPreviousLocation.model';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css'],
})
export class NewLocationComponent implements OnInit {
  @ViewChild('locationForm') locationForm: NgForm;
  @Input('savedLocation') prevLocation: ContactPreviousLocation[];
  showPrevButton = true;
  indContractReq: IndividualContractReq;
  Language = Languages;
  lang: string;
  translation = TranslationData;
  locationFormData: LocationFormData;
  selectedCity: City;
  selectedDistrict: District;
  selectedHousingType: KeyValuePairs;
  selectedFloorNumber: KeyValuePairs;
  selectedHouseNumber: string;
  selectedApartmentNumber: string;
  selectedAddress: string;
  showApartmentNumber = false;
  options: any;
  lat = 0;
  mlat = 0;
  lng = 0;
  mlng = 0;
  showMarker = false;
  isAuthenticated = false;
  user: User;
  showMap = false;
  showLoader = true;
  location = '';
  locationSaved = this.individualContractService.individualContractReq;
  paths: {
    lat: number;
    lng: number;
  }[] = [];

  submitted: boolean = false;
  cities: City[];
  districts: District[];
  housingType: KeyValuePairs[];
  floorNumbers: KeyValuePairs[];
  mapError: boolean = false;
  geoCoder: any;
  zoom = 10;
  currentLocationError = false;
  currentLocationOutOfBounds = false;
  countryRestriction = {
    latLngBounds: {
      east: 57,
      north: 34,
      south: 15,
      west: 34,
    },
    strictBounds: true,
  };

  constructor(
    private individualContractService: IndividualContractService,
    private router: Router,
    private locationService: LocationService,
    private localStorageService: LocalStorageService,
    private footerLoaderService: FooterLoaderService,
    private authService: AuthService,
    private mapsAPILoader: MapsAPILoader
  ) {
    this.footerLoaderService.footer.emit();
  }

  ngOnInit(): void {
    this.setLocationData();

    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder();
    // });

    this.lang = this.localStorageService.languageLocalStorage;

    this.locationService.getCities().subscribe((cities) => {
      this.cities = cities;
      if (this.indContractReq) {
        this.selectedCity = cities.find(
          (s) => s.cityId == this.indContractReq.cityId
        );
        this.onChangeCity(this.selectedCity);
      }
      // this.showLoader = false;
    });

    this.locationService.prevLocation.subscribe((resData) => {
      if (resData.length == 0) this.showPrevButton = false;
    });
    this.authService.userSb.subscribe((user) => {
      this.showPrevButton = !!user;
    });
  }
  setCurrentLocation() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          // this.getCurrentAddress(this.lat, this.lng);
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
            this.currentLocationOutOfBounds = true;
            return;
          }
          this.checkIfCurrentLocationInPolygin(position);
        });
      }
      this.geoCoder = new google.maps.Geocoder();
    });
  }
  checkIfCurrentLocationInPolygin(position: GeolocationPosition) {
    if (this.paths.length == 0) {
      this.setCurrentLocationMarker(position);
      return;
    }
    const bermudaTriangle = new google.maps.Polygon({ paths: this.paths });
    const latLng = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    const resultColor = google.maps.geometry.poly.containsLocation(
      latLng,
      bermudaTriangle
    );
    if (resultColor) {
      this.setCurrentLocationMarker(position);
      alert('success');
    } else {
      this.currentLocationError = true;
    }
  }
  setCurrentLocationMarker(position: GeolocationPosition) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.mlat = +position.coords.latitude;
    this.mlng = +position.coords.longitude;
    this.showMarker = true;
    this.zoom = 12;
  }
  getCurrentAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.location = results[0].formatted_address;
            console.log(latitude + ' ' + longitude);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }
  setLocationData() {
    this.indContractReq = this.localStorageService.indivContractReqLocalStorage;

    if (!this.indContractReq) return;

    this.selectedCity = this.indContractReq.city;
    this.selectedHouseNumber = this.indContractReq.houseNo;
    this.selectedApartmentNumber = this.indContractReq.partmentNumber;
  }
  onChangeCity(city: any) {
    this.submitted = false;
    if (!city) return;

    this.mlat = 0;
    this.mlng = 0;

    this.locationService.getDistrict(city.cityId).subscribe((districts) => {
      this.districts = districts;
      if (this.indContractReq.district) {
        this.selectedDistrict = districts.find(
          (s) => s.districtId == this.indContractReq.district.districtId
        );
        this.onChangeDistrict(this.selectedDistrict);
      }
    });
  }
  onChangeDistrict(district: any) {
    this.submitted = false;

    this.mlat = 0;
    this.mlng = 0;

    this.locationService
      .getPolygon(district.districtId)
      .subscribe((triangleCoords) => {
        if (!triangleCoords) {
          this.lat = 24.7136;
          this.lng = 46.6753;
          this.showMap = true;
          this.showMarker = false;
          this.showMarker = true;
          this.paths = [];
          this.location = null;
          this.zoom = 12;
          this.getHousingTypes();
          this.getHousingFloors();
          return;
        }
        console.log(triangleCoords);

        this.lat = triangleCoords[0].lat;
        this.lng = triangleCoords[triangleCoords.length - 1].lng;
        this.paths = triangleCoords;
        this.zoom = 12;
        this.getAddress();
        this.getHousingTypes();
        this.getHousingFloors();
        this.showMap = true;

        if (this.indContractReq.latitude && this.indContractReq.longitude) {
          this.mlat = +this.indContractReq.latitude;
          this.mlng = +this.indContractReq.longitude;
          this.showMarker = true;
        }
        if (
          this.indContractReq &&
          this.indContractReq.districtId != district.districtId
        ) {
          this.mlat = 0;
          this.mlng = 0;
          this.showMarker = false;
        }
      });
  }

  getAddress() {
    this.locationService
      .getAddressByLatAndLong(this.lat, this.lng)
      .subscribe((data) => {
        this.location = data.formatted_address;
      });
  }
  getHousingTypes() {
    this.locationService.getHousingTypes().subscribe((data) => {
      this.housingType = data;
      if (this.indContractReq.houseType != null) {
        this.selectedHousingType = this.housingType.find(
          (s) => s.key == this.indContractReq.houseType
        );
        this.onChangeHouseType(this.selectedHousingType);
      }
    });
  }

  getHousingFloors() {
    this.locationService.getHousingFloors().subscribe((data) => {
      this.floorNumbers = data;
      if (this.indContractReq.floorNo != null)
        this.selectedFloorNumber = this.floorNumbers.find(
          (s) => s.key == +this.indContractReq.floorNo
        );
    });
  }
  onChangeHouseType(housingType: KeyValuePairs) {
    if (housingType.key === HousingType.Apartment)
      this.showApartmentNumber = true;
    else this.showApartmentNumber = false;
  }

  onPolygonClick(event: google.maps.PolyMouseEvent) {
    this.mapError = false;
    this.currentLocationError = false;
    this.currentLocationOutOfBounds = false;
    this.showMarker = true;
    this.mlat = event.latLng.lat();
    this.mlng = event.latLng.lng();
  }
  onMapClick(event: any) {
    if (this.paths && this.paths.length > 0) {
      // alert('');
      return;
    }
    this.mlat = event.latLng.lat();
    this.mlng = event.latLng.lng();
    this.showMarker = true;
  }
  mapReadyHandler(map: google.maps.Map): void {
    // this.map = map;
    console.log(map.getBounds());
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('ChangeLocation')
    );
    let mapClickListener = map.addListener(
      'click',
      (e: google.maps.MouseEvent) => {
        this.currentLocationError = false;
        if (this.paths && this.paths.length > 0) {
          // alert('لا يمكنك تحديد هذا الموقع حيث أنه خارج نظاق الحي');
          this.mapError = true;
          return;
        }
        console.log(e.latLng.lat(), e.latLng.lng());
        this.mlat = e.latLng.lat();
        this.mlng = e.latLng.lng();
        this.showMarker = true;
      }
    );
  }
  savedLocationPage() {
    this.individualContractService.updateStepData(
      ContractStepsEnum.FirstStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.SecondStep);
    this.router.navigate(['/services']);
  }
  navigateToSavedAddress() {
    this.individualContractService.updateStepData(
      ContractStepsEnum.FirstStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.SecondStep);
    this.router.navigate(['/services']);
  }
  nextPage() {
    if (!this.locationForm.valid || !this.mlat) {
      this.submitted = true;
      return;
    }

    let location = {
      ...this.locationForm.value,
      mLatitude: this.mlat,
      mLongitude: this.mlng,
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
