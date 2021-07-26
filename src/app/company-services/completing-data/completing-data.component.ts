import { IndividualContractReq } from 'src/app/shared/models/individualContractReq.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { Contact } from 'src/app/customer-control-panel/dashboard/dashboard.model';
import { ProfileService } from './../../customer-control-panel/profile/profile.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseQuickLookup } from 'src/app/shared/models/baseQuickLookup.model';
import { NgForm } from '@angular/forms';
import { ContractStepsEnum, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';

@Component({
    selector: 'app-completing-data',
    styleUrls: ['./completing-data.component.css'],
    templateUrl: './completing-data.component.html'
})
export class CompletingDataComponent implements OnInit {
    @ViewChild('profileForm') locationForm: NgForm;
    contact: Contact;
    cities: BaseQuickLookup[];
    selectedCity: BaseQuickLookup;
    genders: BaseQuickLookup[];
    selectedGenders: BaseQuickLookup;
    regions: BaseQuickLookup[];
    selectedRegions: BaseQuickLookup;
    nationalities: BaseQuickLookup[];
    selectedNationalities: BaseQuickLookup;
    success = false;
    submitted = false;
    saudiNationality = false;
    individualContractReq: IndividualContractReq;
    constructor(private individualContractService: IndividualContractService,
        private profileService: ProfileService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.individualContractService.step.next(ContractStepsEnum.SixthStep);
        this.individualContractReq = this.localStorageService.indivContractReqLocalStorage;

        this.profileService.getDetails().subscribe(data => {
            this.contact = data;
            // this.idNumber = data?.identificationNo;
            this.profileService.getCities().subscribe(cities => {
                this.cities = cities;
                if (this.contact.cityId) {
                    this.selectedCity = cities.find(s => s.key == this.contact.cityId);
                    this.profileService.getAllRegions(this.selectedCity.key).subscribe(regions => {
                        this.regions = regions;
                        this.selectedRegions = regions.find(s => s.key == this.contact.regionId);
                    });
                }
            });

            this.profileService.getNationalities().subscribe(nationalities => {
                this.nationalities = nationalities;
                if (this.contact.nationalityId)
                    this.selectedNationalities = nationalities.find(s => s.key == this.contact.nationalityId);

            });

            this.profileService.getGender().subscribe(genders => {
                this.genders = genders;
                if (this.contact.genderId)
                    this.selectedGenders = genders.find(s => +s.key == this.contact.genderId);
            });
        });
    }
    onChangeCity(city: any) {

        if (!city) return;

        this.profileService.getAllRegions(city.key).subscribe(regions => {
            this.regions = regions;
        });
    }
    onSubmit() {
        this.submitted = true;
        if (!this.locationForm.valid) return;

        this.contact.identificationNo = this.locationForm.value?.identificationNo;
        this.contact.jobTitle = this.locationForm.value?.jobTitle;
        this.contact.cityId = this.selectedCity?.key;
        this.contact.nationalityId = this.selectedNationalities?.key;
        this.contact.genderId = +this.selectedGenders?.key;
        this.contact.regionId = this.selectedRegions?.key;
        this.success = false;
        this.profileService
            .updateProfile(this.contact)
            .subscribe(s => {
                this.individualContractService.userDataCompleted.next(true);
                this.router.navigate(['/services/details'], {
                    queryParams: {
                        stepId: this.individualContractReq.stepId,
                    },
                });
                this.individualContractService.updateStepData(ContractStepsEnum.FifthStep, StepTypeEnum.Previous);
                this.individualContractService.step.next(ContractStepsEnum.FifthStep);
            });
    }
    // cancelProfile() {
    //     this.locationForm.reset();
    //     this.router.navigate(['/services/details'], {
    //         queryParams: {
    //             stepId: this.individualContractReq.stepId,
    //         },
    //     });
    // }
}