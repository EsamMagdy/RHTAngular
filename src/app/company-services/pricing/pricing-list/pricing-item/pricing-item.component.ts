import { IndividualContractReq } from './../../../../shared/models/individualContractReq.model';
import { LocalStorageService } from './../../../../shared/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { PackageService } from '../../pricing.service';

@Component({
  selector: 'app-pricing-item',
  templateUrl: './pricing-item.component.html',
  styleUrls: ['./pricing-item.component.css']
})
export class PricingItemComponent implements OnInit {
  packages: IndividualPricing[];
  packageSelected: IndividualPricing;
  indivContractReq: IndividualContractReq;
  constructor(
    private packageService: PackageService,
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.setPricingData();
    
    this.packageService.packages.subscribe((packages) => {
      if (!packages || packages.length == 0) {
        this.packages = [];
        return;
      }
      packages.forEach((item) => {
        // item.isSelected = false;
        // if (this.packageSelected)
        item.isSelected = this.packageSelected != null
          ? this.packageSelected.id == item.id
            ? true
            : false
          : false;
      });
      this.packages = packages;
    });
  }
  setPricingData() {
    this.indivContractReq = this.localStorageService.indivContractReqLocalStorage;
    if (!this.indivContractReq) return;

    this.packageSelected = this.indivContractReq.pricing;
  }
  onChoosePackage(pricing: IndividualPricing) {
    this.packages.forEach((x) => {
      if (x.id != pricing.id) x.isSelected = false;
    });
    pricing.isSelected = true;
    this.packageSelected = pricing;
    this.packageService.packageChoosed.next(pricing);
  }

}
