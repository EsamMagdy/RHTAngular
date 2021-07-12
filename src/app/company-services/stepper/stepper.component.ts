import { LocalStorageService } from './../../shared/services/localStorage.service';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  step: number;
  showCompletedData = false
  constructor(private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.step = this.localStorageService.indivContractReqLocalStorage.currentStep - 1;
    this.individualContractService.step.subscribe(step => {
      this.step = step - 1;
      console.log(this.step);


    });

    this.individualContractService.userDataCompleted.subscribe(data => {
      if (data)
        this.showCompletedData = false;
      else
        this.showCompletedData = true;
    })
  }

}
