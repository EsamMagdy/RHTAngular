import { LocalStorageService } from './../../../shared/services/localStorage.service';
import {
  StepTypeEnum,
  IndividualContractReq,
  HousingType,
} from './../../../shared/models/individualContractReq.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/models/city.model';
import { District } from 'src/app/shared/models/district.model';
import { KeyValuePairs } from 'src/app/shared/models/keyValuePairs.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { LocationService } from '../location.service';
import { LocationFormData } from '../locationForm.model';
import { ContractStepsEnum } from 'src/app/shared/models/individualContractReq.model';
import { FooterLoaderService } from 'src/app/shared/services/footerLoaderAfterView.service';
import { ContactPreviousLocation } from 'src/app/shared/models/contactPreviousLocation.model';
import { NewLocationService } from './new-location.service';
import { NewLocation } from './new-location.model';
@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css'],
  providers: [NewLocationService],
})
export class NewLocationComponent implements OnInit {
  @ViewChild('locationForm') locationForm: NgForm;
  @Input('savedLocation') prevLocation: ContactPreviousLocation[];
  newLocation: NewLocation = {} as NewLocation;
  showPrevButton = true;
  indContractReq: IndividualContractReq;
  locationFormData: LocationFormData;
  selectedCity: City;
  selectedDistrict: District;
  selectedHousingType: KeyValuePairs;
  selectedFloorNumber: KeyValuePairs;
  selectedHouseNumber: string;
  selectedApartmentNumber: string;
  selectedAddress: string;

  submitted: boolean = false;
  cities: City[];
  districts: District[];
  housingType: KeyValuePairs[];
  floorNumbers: KeyValuePairs[];
  mapError: boolean = false;
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
    public newLocationService: NewLocationService
  ) {
    this.footerLoaderService.footer.emit();
  }

  ngOnInit(): void {
    this.setLocationData();

    this.getCities();

    this.authService.userSb.subscribe((user) => {
      this.showPrevButton = !!user; // show/hidden prevoius button based on user logging
    });
  }

  getCities() {
    this.locationService.getCities().subscribe((cities) => {
      this.cities = cities;
      if (this.indContractReq) {
        this.selectedCity = cities.find(
          (s) => s.cityId == this.indContractReq.cityId
        );
        this.onChangeCity(this.selectedCity);
      }
    });
  }
  async setCurrentLocation() {
    let isCurrentLocationBoundry =
      await this.newLocationService.setCurrentLocation();

    if (!isCurrentLocationBoundry) {
      this.newLocation.currentLocationOutOfBoundsEM = true;
      return;
    }

    this.newLocation = await this.newLocationService.checkIfCurrentLocationInPolygin(this.newLocation.paths);
  }
  setLocationData() {
    this.individualContractService.step.next(ContractStepsEnum.SecondStep);
    this.indContractReq = this.localStorageService.indivContractReqLocalStorage;

    if (!this.indContractReq) return;

    this.selectedCity = this.indContractReq.city;
    this.selectedHouseNumber = this.indContractReq.houseNo;
    this.selectedApartmentNumber = this.indContractReq.partmentNumber;
  }
  onChangeCity(city: any) {
    this.submitted = false;
    if (!city) return;

    this.newLocation.markerLatitude = 0;
    this.newLocation.markerLongitude = 0;

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

    this.locationService
      .getPolygon(district.districtId)
      .subscribe((triangleCoords) => {
        this.newLocation = this.newLocationService.setNewLocationModel(triangleCoords);
        if (triangleCoords) this.getAddress();
        this.getHousingTypes();
        this.getHousingFloors();

        this.checkIfLatLongSavedBefore(district);
      });
  }

  getAddress() {
    this.newLocation.address = '';
    this.locationService
      .getAddressByLatAndLong(
        this.newLocation.latitude,
        this.newLocation.longitude
      )
      .subscribe((data) => {
        this.newLocation.address = data.formatted_address;
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
      this.newLocation.showApartmentNumber = true;
    else this.newLocation.showApartmentNumber = false;
  }

  onPolygonClick(event: google.maps.PolyMouseEvent) {
    this.newLocation = { ...this.newLocationService.onPolygonClick(event) };
  }
  mapReadyHandler(map: google.maps.Map): void {
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('ChangeLocation')
    );
    let mapClickListener = map.addListener(
      'click',
      (e: google.maps.MouseEvent) => {
        this.newLocation.currentLocationOutsideTheNeighborhoodEM = false;
        if (this.newLocation.paths && this.newLocation.paths.length > 0) {
          this.newLocation.locationOutsideTheNeighborhoodEM = true;
          return;
        }
        this.newLocation.markerLatitude = e.latLng.lat();
        this.newLocation.markerLongitude = e.latLng.lng();
        this.newLocation.showMarker = true;
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
  pricingPage() {
    if (!this.locationForm.valid || !this.newLocation.markerLatitude) {
      this.submitted = true;
      return;
    }


    this.newLocationService.pricingPage(this.locationForm.value);
  }
  checkIfLatLongSavedBefore(district: any) {
    if (this.indContractReq.latitude && this.indContractReq.longitude) {
      this.newLocation.markerLatitude = +this.indContractReq.latitude;
      this.newLocation.markerLongitude = +this.indContractReq.longitude;
      this.newLocation.showMarker = true;
    }
    if (
      this.indContractReq &&
      this.indContractReq.districtId != district.districtId
    ) {
      this.newLocation.markerLatitude = 0;
      this.newLocation.markerLongitude = 0;
      this.newLocation.showMarker = false;
    }
  }
}
