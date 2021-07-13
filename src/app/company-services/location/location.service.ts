import { LocalStorageService } from './../../shared/services/localStorage.service';
import { AuthService } from './../../auth/auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { City } from 'src/app/shared/models/city.model';
import { ContactPreviousLocation } from 'src/app/shared/models/contactPreviousLocation.model';
import { District } from 'src/app/shared/models/district.model';
import { KeyValuePairs } from 'src/app/shared/models/keyValuePairs.model';
import { ResponseDataCRM, ResponseDataCRMWithDeleting, ResponseDataCRMWithObjectData } from 'src/app/shared/models/responseDataCRM.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { User } from 'src/app/shared/models/user.model';


@Injectable({ providedIn: 'root' })
export class LocationService {
  showNewAddress = new Subject<boolean>();
  prevLocation = new Subject<ContactPreviousLocation[]>();
  user: User;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {


  }

  getCities() {
    return this.http
      .get<ResponseDataCRM<City>>(
        environment.apiUrl + 'city/GetIndvCities'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }

  getDistrict(cityId: string) {
    return this.http
      .get<ResponseDataCRM<District>>(
        environment.apiUrl + 'city/Districts/' + cityId
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getPolygon(districtId: string) {
    return this.http
      .get<ResponseDataCRMWithObjectData<{ value: string }>>(
        environment.apiUrl + 'city/Get_PolygonPath?DistrictID=' +
        districtId
      )
      .pipe(
        map((resData) => {
          debugger;
          if (!resData.data.value) return null;

          let polygon = resData.data.value;
          let shap = polygon
            .replace(', ]', '')
            .replace('[ ', '')
            .replace(/ /g, '')
            .replace(/' , '/, ',')
            .replace(/"/g, '');
          let shaplist = shap.split(',');
          let triangleCoords = [];
          let count = shaplist.length / 2;
          for (var i = 0; i < shaplist.length; i += 2) {
            triangleCoords.push({
              lat: parseFloat(shaplist[i]),
              lng: parseFloat(shaplist[i + 1]),
            });
          }
          return triangleCoords;
        })
      );
  }
  getAddressByLatAndLong(lat: number, lng: number) {
    let lang = localStorage.getItem('lang') ?? 'ar';
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAlKMP7a65UobHAwUnPVTgZ49U-QmGaqpE&language=${lang}`
      )
      .pipe(
        map((resData: any) => {
          return resData.results[0];
        })
      );
  }
  getHousingTypes() {
    return this.http
      .get<ResponseDataCRM<KeyValuePairs>>(
        environment.apiUrl + 'IndividualContractRequest/Options/HousingTypes'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getHousingFloors() {
    return this.http
      .get<ResponseDataCRM<KeyValuePairs>>(
        environment.apiUrl + 'IndividualContractRequest/Options/HousingFloors'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getContactSavedAddressForIndiv() {
    // const contactId = this.individualContractService.individualContractReq
    //   .contactId;

    // let isAuthenticated = !!this.user;
    // if (!isAuthenticated) return null;

    let userData = this.localStorageService.userLocalStorage;
    if (!userData) return null;
    return this.http
      .get<ResponseDataCRM<ContactPreviousLocation>>(
        environment.apiUrl + `contact/GetContactSavedAddressForIndiv?ContactId=${userData.crmUserId}`
      )
      .pipe(
        map((resData) => {
          this.prevLocation.next(resData.data);
          return resData.data;
        })
      );
  }
  addNewLocation(location: any, userId: string) {
    location.contactId = userId;
    location.latitude = location.mLatitude;
    location.longitude = location.mLongitude;

    return this.http
      .post<ResponseDataCRMWithObjectData<ContactPreviousLocation>>(
        environment.apiUrl + `contact/AddLocation`,
        location
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  deleteSavedAddress(locationId: string) {
    return this.http
      .get<ResponseDataCRMWithDeleting>(
        environment.apiUrl + `Contact/DeleteSavedAddress/${locationId}`
      )
      .pipe(
        map((resData) => {
          return resData.data.value;
        })
      );
  }
}
