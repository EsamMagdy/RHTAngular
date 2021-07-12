import { Router } from '@angular/router';
import { Lead } from './../../dashboard/dashboard.model';
import { NgForm } from '@angular/forms';
import { BaseQuickLookup } from './../../../shared/models/baseQuickLookup.model';
import { OtherOrdersService } from './../other-orders.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-other-orders',
  templateUrl: './other-orders-creation.component.html',
  styleUrls: ['./other-orders-creation.component.css']
})
export class OtherOrdersCreationComponent implements OnInit {
  @ViewChild('indivForm') indivForm: NgForm;
  professions: BaseQuickLookup[];
  selectedProfession: BaseQuickLookup;
  nationalities: BaseQuickLookup[];
  selectedNationalitie: BaseQuickLookup;
  name: string;
  submitted = false;
  success = false;
  mobileNumber: string;
  constructor(private otherOrdersService: OtherOrdersService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.mobileNumber = this.localStorageService.userLocalStorage.phoneNumber;

    this.otherOrdersService
      .getProfessionsForBusinessSector()
      .subscribe(data => this.professions = data);

    this.otherOrdersService
      .getNationalityIndvSector()
      .subscribe(data => this.nationalities = data);
  }
  onChangeName(event: any) {
    let input = event.target;
    var val = input.value;
    var end = input.selectionEnd;
    let code = event.keyCode;

    if (code == 32 && (val[end - 1] == " " || val[end] == " ")) {
      event.preventDefault();
      return false;
    }
    if (code > 47 && code < 58 || code > 95 && code < 107) {
      event.preventDefault();
      return false;
    }
    return true;

  }
  createIndiv() {
    this.submitted = true;
    if (!this.indivForm.valid) return;

    this.success = false;
    let lead = { ...this.indivForm.value } as Lead;
    lead.preferredProfession = this.selectedProfession.key;
    lead.nationalityId = this.selectedNationalitie.key;
    this.otherOrdersService.createOtherOrders(lead).subscribe(data => {
      if (data) {
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard/other-orders']);

        }, 5000);
      }

    });
  }
  onCancelIndiv() {
    this.indivForm.reset();
    this.router.navigate(['/dashboard/other-orders']);
  }

}
