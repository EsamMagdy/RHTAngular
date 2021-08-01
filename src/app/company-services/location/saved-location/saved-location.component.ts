import { IndividualContractReq } from './../../../shared/models/individualContractReq.model';
import { LocalStorageService } from './../../../shared/services/localStorage.service';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Mapper } from "@dboneslabs/mpr/mapper";
import { MapperFactory } from "@dboneslabs/mpr/mapper-factory";
import { ConfirmationService, ConfirmEventType, MessageService } from "primeng/api";
import { ContactPreviousLocation } from "src/app/shared/models/contactPreviousLocation.model";
import { ContractStepsEnum, StepTypeEnum } from "src/app/shared/models/individualContractReq.model";
import { IndividualContractService } from "src/app/shared/services/individualContractReq.service";
import { LocationService } from "../location.service";

@Component({
  selector: 'app-saved-location',
  templateUrl: './saved-location.component.html',
  styleUrls: ['saved-location.component.less'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('* => void', [
        animate(300, style({
          transform: 'translateY(100px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class SavedLocationComponent implements OnInit {
  @Input('savedLocation') prevLocation: ContactPreviousLocation[];
  activeLocation = false;
  showNewAddressButton = false;
  clickDeleted = false;
  mapperFactory: MapperFactory;
  mapper: Mapper;
  locationSelected: ContactPreviousLocation;
  responsiveOptions: any;
  indivContractReq: IndividualContractReq;

  constructor(
    private locationService: LocationService,
    private individualContractService: IndividualContractService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.locationSelected = this.prevLocation.find(s => s.isSelected == true);
    this.showNewAddressButton = this.locationSelected != null ? true : false;
    // this.locationService.showNewAddress.subscribe(s => this.showNewAddressButton = !s);
    // this.locationService
    //   .getContactSavedAddressForIndiv()
    //   .subscribe((resData) => {
    //     this.prevLocation = resData;
    //     this.prevLocation.forEach((x) => (x.isSelected = false));
    //   });
  }
  onSelectLocation(location: ContactPreviousLocation) {
    if (this.clickDeleted) {
      this.clickDeleted = false;
      return;
    }
    this.prevLocation.forEach((x) => {
      if (x.contactPreviouslocationId != location.contactPreviouslocationId) {
        x.isSelected = false;

      }
    });
    location.isSelected = !location.isSelected;
    this.showNewAddressButton = location.isSelected ? true : false;
    this.locationSelected = location;
  }
  onNewAddressButtonClick() {
    this.locationService.showNewAddress.next(true);
    this.resetLocation();
  }
  resetLocation() {
    let indiv = this.localStorageService.indivContractReqLocalStorage;

    let newIndiv = {
      stepId: indiv.stepId,
      currentStep: indiv.currentStep,
      stepType: indiv.stepType
    };

    this.localStorageService.indivContractReqLocalStorage = newIndiv as IndividualContractReq;
  }
  packagePage() {
    // this.setSelectedLocation();
    if (!this.locationSelected) return;
    this.individualContractService.setLoactionData(this.locationSelected);
    this.individualContractService.updateStepData(ContractStepsEnum.ThirdStep, StepTypeEnum.Next);
    this.individualContractService.individualContractReq.currentStep = ContractStepsEnum.ThirdStep;
    this.individualContractService.step.next(ContractStepsEnum.ThirdStep);
    this.router.navigate(['/services/pricing'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
  deleteLocation(location: ContactPreviousLocation) {
    this.clickDeleted = true;
    this.locationService
          .deleteSavedAddress(location.contactPreviouslocationId)
          .subscribe((data) => {
            if (data) {
              this.prevLocation.forEach((item) => {
                if (
                  item.contactPreviouslocationId ===
                  location.contactPreviouslocationId
                ) {
                  let index = this.prevLocation.indexOf(item);
                  if (index !== -1) this.prevLocation.splice(index, 1);
                }
                if (this.prevLocation.length === 0) {
                  this.locationService.showNewAddress.next(true);
                  this.locationService.prevLocation.next([]);

                }
                this.showNewAddressButton = false;
                // this.locationService.showNewAddress.next(false);
              });
            }
          });
    
  }
  private setSelectedLocation() {
    this.individualContractService.setLoactionData(this.locationSelected);

  }
}