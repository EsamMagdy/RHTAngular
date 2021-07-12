import { IndividualContractReq } from './../../../shared/models/individualContractReq.model';
import { LocalStorageService } from './../../../shared/services/localStorage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeyValuePairs, StringKeyValuePairs } from 'src/app/shared/models/keyValuePairs.model';
import { NationalityWithEmpAvailableNumber } from 'src/app/shared/models/nationalityWithEmpAvailableNumber.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { PackageService } from '../pricing.service';

@Component({
  selector: 'app-pricing-filter',
  templateUrl: './pricing-filter.component.html',
  styleUrls: ['./pricing-filter.component.css']
})
export class PricingFilterComponent implements OnInit {

  @ViewChild('filterForm') filterForm: NgForm;
  professions: StringKeyValuePairs[] = null;
  nationalities: NationalityWithEmpAvailableNumber[] = null;
  professionId: string;
  nationalityId: string;
  selectedProfession: StringKeyValuePairs;
  selectedNationality: NationalityWithEmpAvailableNumber;
  indivContractReq: IndividualContractReq;
  constructor(private packageService: PackageService,
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    console.log('pricing filter');
    this.setPackageFikter();

    this.packageService.getProfessions()
      .subscribe(data => {
        this.professions = data;
        this.selectedProfession = this.indivContractReq.professionId != null
          ? data.find(s => s.key == this.indivContractReq.professionId)
          : this.professions[0];
        this.onChangeProfession(this.selectedProfession);
        this.professionId = this.selectedProfession.key;
        this.packageService.filteringData.next({ nationality: this.selectedNationality, profession: this.selectedProfession });
      });


  }
  setPackageFikter() {
    this.indivContractReq = this.localStorageService.indivContractReqLocalStorage;
    if (!this.indivContractReq) return;

    this.selectedNationality = { nationalityId: this.indivContractReq.nationalityId, nationalityName: this.indivContractReq.nationalityName }
    this.selectedProfession = { key: this.indivContractReq.professionId, value: this.indivContractReq.professionName };
  }
  onChangeProfession(profession: StringKeyValuePairs) {
    this.selectedProfession = profession;
    this.professionId = profession.key;
    this.packageService.getNationalitiesByProfession(profession.key)
      .subscribe(data => {
        if (data.length > 0) {
          this.nationalities = data;
          this.selectedNationality = this.indivContractReq.nationalityId != null
            ? data.find(s => s.nationalityId == this.indivContractReq.nationalityId)
            : this.nationalities[0];
          this.nationalityId = this.selectedNationality.nationalityId
          this.loadPackages(this.professionId, this.nationalityId);
          this.individualContractService.setProfessionAndNationality(this.selectedProfession, this.selectedNationality);
        }
        else {
          this.selectedNationality = null;
          this.nationalities = null;
          this.packageService.packages.next();
          this.individualContractService.professionName.next([this.selectedProfession.value, null]);
        }
        this.packageService.filteringData.next({ nationality: this.selectedNationality, profession: this.selectedProfession });
      });
  }
  onChangeNationality(nationality: NationalityWithEmpAvailableNumber) {
    if (this.selectedProfession) {
      this.loadPackages('' + this.selectedProfession.key, nationality.nationalityId);
      this.selectedNationality = nationality;
      this.packageService.filteringData.next({ nationality: nationality, profession: this.selectedProfession });
      this.individualContractService.setProfessionAndNationality(this.selectedProfession, this.selectedNationality);
    }
  }
  filterPackages() {
    let profession = this.filterForm.value.profession;
    let nationality = this.filterForm.value.nationality;

    if (!nationality || !profession)
      return;

  }

  loadPackages(professionId: string, nationalityId: string) {
    this.packageService.loadPackages(professionId, nationalityId).subscribe(
      data => { });
  }

  // setProfessionAndNationality(){
  //   this.individualContractService.setProfessionAndNationality(this.selectedProfession,this.selectedNationality);
  // }

}
