import {
  IndividualContractAttachment,
  IndividualContractReq,
} from './../../shared/models/individualContractReq.model';
import { LocalStorageService } from './../../shared/services/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ResponseDataCRMForContractTemplate,
  ResponseDataCRMWithDeleting,
  ResponseDataCRMWithObjectData,
  ResponseDataCRMWithPaging,
} from 'src/app/shared/models/responseDataCRM.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AttachmentsService } from 'src/app/company-services/attachments/attachments.service';

@Injectable({ providedIn: 'root' })
export class IndOrdersService {
  private userId: string;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    public attachmentsService:AttachmentsService
  ) {
    this.userId = this.localStorageService.userLocalStorage.crmUserId;
  }

  getAllIndRequests(pageNumber: number, pageSize: number) {
    return this.http
      .get<ResponseDataCRMWithPaging<IndividualContractReq>>(
        environment.apiUrl +
          `IndividualContractRequest/GetAll?UserId=${this.userId}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getIndContractReqById(contractId: string) {
    return this.http
      .get<ResponseDataCRMWithObjectData<IndividualContractReq>>(
        environment.apiUrl + `IndividualContractRequest/Get/${contractId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }

  cancelRequest(requestId: string) {
    return this.http
      .get<ResponseDataCRMWithDeleting>(
        environment.apiUrl +
          `IndividualContractRequest/CancelRequest?RequestId=${requestId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  uploadAttachments(
    indContractReqId: string,
    fieldName: string,
    imageBase: string,
    name: string
  ) {
    return this.http.post<ResponseDataCRMForContractTemplate<string>>(
      environment.apiUrl + 'IndividualContractRequest/UploadAttachments',
      {
        Id: indContractReqId,
        ImageBase: imageBase,
        Name: name,
        FieldName: fieldName,
      }
    );
  }
  getAttachments(indContractReqId: string) {
    return this.http.get<
      ResponseDataCRMWithObjectData<IndividualContractAttachment>
    >(
      environment.apiUrl +
        `IndividualContractRequest/GetAttachments?contractId=${indContractReqId}`
    );
  }
}
