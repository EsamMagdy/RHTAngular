import { Router, ActivatedRoute } from '@angular/router';
import { CustomerControlPanelService } from './../customer-control-panel.service';
import { District } from 'src/app/shared/models/district.model';
import { BaseQuickLookup } from './../../shared/models/baseQuickLookup.model';
import { ProfileService } from './profile.service';
import { Contact } from './../dashboard/dashboard.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
  constructor(private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {


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

  getRegions() {

  }
  onSubmit() {
    this.submitted = true;
    if (!this.locationForm.valid) return;

    this.contact.identificationNo = this.locationForm.value?.identificationNo ?? this.locationForm.controls.identificationNo.value;
    this.contact.jobTitle = this.locationForm.value?.jobTitle;
    this.contact.cityId = this.selectedCity?.key;
    this.contact.nationalityId = this.selectedNationalities?.key;
    this.contact.genderId = +this.selectedGenders?.key;
    this.contact.regionId = this.selectedRegions?.key;
    this.success = false;
    this.profileService.updateProfile(this.contact).subscribe(() => {
      this.success = true;
    });
  }
  cancelProfile() {
    this.locationForm.reset();
    this.router.navigate(['../', { relativeTo: this.route }]);
  }
}
