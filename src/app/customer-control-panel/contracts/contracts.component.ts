import { ContractsService } from './contracts.service';
import { Component, OnInit } from '@angular/core';
import { IndividualContract } from 'src/app/shared/models/individualContract.model';
import { LocalStorageKeys } from 'src/app/shared/models/localStorage.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  totalCount: number;
  pageNumber: number = 1;
  pageSize: number = 5;
  individualContract: IndividualContract[];
  constructor(private contractsService: ContractsService,
    private translateService:TranslateService) { }

  ngOnInit(): void {
    let lang = localStorage.getItem(LocalStorageKeys.language);
    this.translateService.use(lang);
    this.getAllContracts(1, 5);
  }

  paginate(event: { page: number, first: number, rows: number, pageCount: number }) {
    event.page += 1;
    this.getAllContracts(event.page, 5);

  }
  getAllContracts(pageNumber: number, pageSize: number) {
    this.contractsService.getAllContracts(pageNumber, pageSize).subscribe(data => {
      this.totalCount = data.totalCount;
      this.individualContract = data.model;
      data.model.forEach(s => {
        // let difference_In_Time = s.serviceEndDate.getTime() - (new Date).getTime();

        // // To calculate the no. of days between two dates
        // let difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
        // let renewDays = parseInt(urlHiddin.data("renewdaysbefore"));
        // if (difference_In_Days < renewDays && data.StatusCode == "279640001") {
        //   button += '<a href=' + urlHiddin.data('renewcontracturl') + '/' + data.IndividualContractId + ' class="border-0 btn btn-primary btn-sm text-white" data-toggle="tooltip" data-placement="top" title="تجديد" > <i class="fa fa-refresh"></i></a> ';
        // }
      });
    });
  }
}
