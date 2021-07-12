import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractStepsEnum, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
declare let $: any;

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  checked: boolean = false;
  templateBody: string = null;
  errorMessage: boolean = false;
  constructor(private individualContractService: IndividualContractService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    (await this.individualContractService.getContractTemplate()).subscribe(data => {
      this.templateBody = data.value;
    });
  }
  requestDetailPage() {
    this.router.navigate(['/services/details'], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
    this.individualContractService.updateStepData(ContractStepsEnum.FifthStep, StepTypeEnum.Previous);
    this.individualContractService.step.next(ContractStepsEnum.FifthStep);
  }
  attachmentsPage() {
    if (this.checked) {
      this.router.navigate(['/services/attachment'], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
      this.individualContractService.updateStepData(ContractStepsEnum.SeventhStep, StepTypeEnum.Next);
      this.individualContractService.step.next(ContractStepsEnum.SeventhStep);
    }
    else {
      this.errorMessage = true;
    }
  }

}
