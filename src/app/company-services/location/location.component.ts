import { ContractStepsEnum } from './../../shared/models/individualContractReq.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ContactPreviousLocation } from 'src/app/shared/models/contactPreviousLocation.model';
import { LocationService } from './location.service';
import { FooterLoaderService } from 'src/app/shared/services/footerLoaderAfterView.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  prevLocation: ContactPreviousLocation[] = [];
  isAuthenticated = false;
  showNewAddress: boolean = false;
  selectedLocation: ContactPreviousLocation;

  getContactSavedAddressForIndiv = this.locationService
    .getContactSavedAddressForIndiv();
  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService,
    private footerLoaderService: FooterLoaderService) { 
      this.footerLoaderService.footer.emit();
    }

  ngOnInit(): void {
    let selectedLocationId = this.localStorageService.indivContractReqLocalStorage.selectedLocationId;



    this.individualContractService.step.next(ContractStepsEnum.SecondStep);
    
    this.locationService.showNewAddress.subscribe(
      (showAddress) => (this.showNewAddress = showAddress)
    );

    this.locationService.prevLocation.subscribe(s => this.prevLocation = s);
    this.authService.userSb.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    if (this.getContactSavedAddressForIndiv)
      this.getContactSavedAddressForIndiv.subscribe((resData) => {
        if (resData && resData.length > 0) {
          this.prevLocation = resData;

          this.prevLocation.forEach((x) => {

            x.isSelected =
              selectedLocationId != null
                && x.contactPreviouslocationId == selectedLocationId
                ? true : false;
          });

        }
        else
          this.showNewAddress = true;
      });
  }

}
