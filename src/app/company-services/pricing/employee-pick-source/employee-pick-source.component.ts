import { IndividualContractReq } from './../../../shared/models/individualContractReq.model';
import { LocalStorageService } from './../../../shared/services/localStorage.service';
import { FilterPackageData } from './../../../shared/models/application/filterPackageData.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecieveWorkerType } from 'src/app/shared/models/city.model';
import { EmployeePickSourceEnum } from 'src/app/shared/models/employeePickSourceEnum.model';
import { HousingBuilding, HowToRecieveWorker } from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { PackageService } from '../pricing.service';

@Component({
  selector: 'app-employee-pick-source',
  templateUrl: './employee-pick-source.component.html',
  styleUrls: ['./employee-pick-source.component.css']
})
export class EmployeePickSourceComponent implements OnInit {
  recieveWorkerType: RecieveWorkerType;
  RecieveWorkerType = RecieveWorkerType;
  deliveryCost: number;
  housingBuildings: HousingBuilding[] = [];
  EmployeePickSource = EmployeePickSourceEnum;
  employeePickSource: EmployeePickSourceEnum;
  HowToRecieveWorker = HowToRecieveWorker;
  howtoReceiveWorker: HowToRecieveWorker;
  showEmployeePickSource = false;
  showCompany = false;
  showWebsite = false;
  professionName: string;
  nationalityId: string;
  indivContractReq: IndividualContractReq;
  subscribtion: Subscription;
  constructor(
    private packageService: PackageService,
    private individualContractService: IndividualContractService,
    private localStorageSerivce: LocalStorageService
  ) { }

  ngOnInit(): void {
    
    this.setEmployeePickSourceData();

    this.packageService.packages.subscribe((data) => {
      if (!data || data.length == 0) this.showEmployeePickSource = false;
      else this.showEmployeePickSource = true;
    });
    this.packageService.getCity().subscribe((city) => {
      this.recieveWorkerType = city.recieveWorkerType;
      this.deliveryCost = city.individualContractDeliveryCost;
    });

    this.packageService
      .getHousingBuildingForIndividualContract()
      .subscribe((data) => {
        this.housingBuildings = data;
        if (data)
          this.housingBuildings.forEach(item =>
            item.isSelected = this.indivContractReq.recieveEmployeeFromHousing == item.housingBuildingId ? true : false
          );
      });

    this.packageService.filteringData.subscribe((data) => {
      if (this.indivContractReq) return;
      this.employeePickSource = null;
      this.howtoReceiveWorker = null;
      this.showWebsite = false;
      this.showCompany = false;
    });
    this.subscribtion = this.individualContractService.professionName.subscribe(
      (data: any) => {
        this.professionName = data[0];
        this.nationalityId = data[1];
      }
    );
  }
  setEmployeePickSourceData() {
    this.indivContractReq = this.localStorageSerivce.indivContractReqLocalStorage;

    if (!this.indivContractReq) return;

    this.employeePickSource = this.indivContractReq.employeePickSource;
    this.howtoReceiveWorker = this.indivContractReq.howtoReceiveWorker;

    this.showWebsite =
      this.employeePickSource
        && this.employeePickSource === this.EmployeePickSource.Website
        ? true
        : false;
    this.showCompany =
      this.employeePickSource
        && this.howtoReceiveWorker
        && (this.employeePickSource === this.EmployeePickSource.Company
        && this.howtoReceiveWorker === this.HowToRecieveWorker.FromBranch)
        ||(this.employeePickSource === this.EmployeePickSource.Website
          && this.howtoReceiveWorker === this.HowToRecieveWorker.FromBranch)
        ? true
        : false;

  }
  employeePickSourceClick(employeePickSource: number) {
    this.employeePickSource = employeePickSource;
    if (employeePickSource === this.EmployeePickSource.Company) {
      this.showCompany = true;
      this.showWebsite = false;
    }
    if (employeePickSource === this.EmployeePickSource.Website) {
      this.howtoReceiveWorker = null;
      this.showCompany = false;
      this.showWebsite = true;
    }
    this.packageService.employeePickSource.next({
      employeePickSource: employeePickSource,
      howtoReceiveWorker: 0,
      recieveEmployeeFromHousing: '',
    });
  }
  howToRecieveWorkerClick(howtoReceiveWorker: number) {
    this.howtoReceiveWorker = howtoReceiveWorker;
    if (this.howtoReceiveWorker === this.HowToRecieveWorker.Delivery)
      this.showCompany = false;
    if (this.howtoReceiveWorker === this.HowToRecieveWorker.FromBranch)
      this.showCompany = true;
    this.packageService.employeePickSource.next({
      employeePickSource: this.employeePickSource,
      howtoReceiveWorker: this.howtoReceiveWorker,
      recieveEmployeeFromHousing: '',
    });
  }
  onChooseHousing(housingBuilding: HousingBuilding) {
    this.housingBuildings.forEach(s => s.isSelected = false);
    housingBuilding.isSelected = true;
    this.packageService.employeePickSource.next({
      employeePickSource: this.employeePickSource,
      howtoReceiveWorker: this.howtoReceiveWorker,
      recieveEmployeeFromHousing: housingBuilding.housingBuildingId,
    });
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
