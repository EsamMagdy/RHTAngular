import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ContractStepsEnum,
  StepTypeEnum,
} from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
declare let $: any;

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit {
  checked: boolean = false;
  templateBody: string = null;
  errorMessage: boolean = false;
  showPrevious = true;

  constructor(
    private individualContractService: IndividualContractService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.individualContractService.step.next(ContractStepsEnum.SeventhStep);
    (await this.individualContractService.getContractTemplate()).subscribe(
      (data) => {
        this.templateBody = data.value;
        this.showPrevious=false;
      }
    );
  }
  requestDetailPage() {
    this.router.navigate(['/services/details'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
    this.individualContractService.updateStepData(
      ContractStepsEnum.FifthStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.FifthStep);
  }
  attachmentsPage() {
    if (this.checked) {
      this.router.navigate(['/services/attachment'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
      this.individualContractService.updateStepData(
        ContractStepsEnum.EighthStep,
        StepTypeEnum.Next
      );
      this.individualContractService.step.next(ContractStepsEnum.EighthStep);
    } else {
      this.errorMessage = true;
    }
  }
}
