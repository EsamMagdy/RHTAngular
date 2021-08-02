import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AttachmentsFieldName } from 'src/app/shared/models/attachments.model';
import {
  ContractStepsEnum,
  IndividualContractAttachment,
  StepTypeEnum,
} from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { AttachmentsService } from './attachments.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css'],
})
export class AttachmentsComponent implements OnInit {
  @ViewChild('identificationImage') identificationCardImage: ElementRef;
  @ViewChild('familyImage') familyCardImage: ElementRef;
  @ViewChild('nAddressImage') nationalAddressImage: ElementRef;
  @ViewChild('custSalaryImage') customerSalaryImage: ElementRef;
  attachments: { [key: string]: any } = {};
  previewImage: any;
  images: any = [];
  displayBasic2: boolean;
  isImage: boolean = true;

  constructor(
    private router: Router,
    private individualContractService: IndividualContractService,
    public attachmentsService: AttachmentsService
  ) {}

  ngOnInit(): void {
    this.individualContractService.step.next(ContractStepsEnum.EighthStep);
  }

  contractlPage() {
    this.router.navigate(['/services/contract'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
    this.individualContractService.updateStepData(
      ContractStepsEnum.SeventhStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.SeventhStep);
  }
  paymentPage() {
    this.chkValidation(
      this.identificationCardImage,
      AttachmentsFieldName.IdentificationCardImage,
      AttachmentsFieldName.IdentificationCardImage
    );
    this.chkValidation(
      this.familyCardImage,
      AttachmentsFieldName.FamilyCardImage,
      AttachmentsFieldName.FamilyCardImage
    );
    this.chkValidation(
      this.nationalAddressImage,
      AttachmentsFieldName.NationalAddressImage,
      AttachmentsFieldName.NationalAddressImage
    );
    this.chkValidation(
      this.customerSalaryImage,
      AttachmentsFieldName.CustomerSalaryImage,
      AttachmentsFieldName.CustomerSalaryImage
    );

    this.individualContractService.individualContractReq.attachments = <
      IndividualContractAttachment
    >this.attachments;
    this.router.navigate(['/services/payment-landing-page'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
    this.individualContractService.updateStepData(
      ContractStepsEnum.NinthStep,
      StepTypeEnum.Next
    );
    this.individualContractService.step.next(ContractStepsEnum.NinthStep);
  }
  onPrieviewImage(imageSelected: any) {
    if (!imageSelected.files || !imageSelected.files[0]) return;

    const file = imageSelected.files[0];
    console.log(file);

    this.priviewImage(file);
  }
  // checkImage(image: any) {
  //   this.isImage = true;
  //   let file = image.target;
  //   const fileType = file.files[0]['type'];
  //   const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  //   if (!validImageTypes.includes(fileType)) {
  //     file.value = null;
  //     this.isImage = false;
  //   }
  // }
  priviewImage(imageSelected: any) {
    this.images[0] = this.previewImage;
    this.displayBasic2 = true;
    const reader = new FileReader();
    reader.onload = (e) => (this.previewImage = reader.result);
    reader.readAsDataURL(imageSelected);
  }

  private async chkValidation(
    element: ElementRef,
    image: any,
    imageName: string
  ) {
    if (element.nativeElement.files && element.nativeElement.files[0]) {
      this.attachments[image] = element.nativeElement.files[0];
      this.attachments[imageName] = element.nativeElement.files[0].name;
      let imageBase64 = (await this.attachmentsService.getImageInBase64(
        element.nativeElement.files[0]
      )) as string;
      let s = imageBase64.split(',')[1];
      // let regex=new RegExp("^[\w/\:.-]+;base64,");
      // imageBase64=regex.exec(imageBase64);
      this.individualContractService
        .uploadAttachments(imageName, s, element.nativeElement.files[0].name)
        .subscribe((s) => {});
    }
  }
  // getBase64(file: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = function () {
    //   //me.modelvalue = reader.result;
    //   console.log(reader.result);
    // };
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
  // }
}
