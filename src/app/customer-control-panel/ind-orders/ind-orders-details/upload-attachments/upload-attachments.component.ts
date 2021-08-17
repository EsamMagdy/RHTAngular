import { FooterLoaderService } from 'src/app/shared/services/footerLoaderAfterView.service';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsFieldName } from 'src/app/shared/models/attachments.model';
import {
  ContractStepsEnum,
  StepTypeEnum,
  IndividualContractAttachment,
} from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { IndOrdersService } from '../../ind-orders.service';
import { Attachments } from './attachments.model';
import { AttachmentsService } from './attachments.service';

@Component({
  selector: 'app-upload-attachments',
  templateUrl: './upload-attachments.component.html',
  styleUrls: ['./upload-attachments.component.css'],
})
export class UploadAttachmentsComponent implements OnInit {
  @ViewChild('identificationImage') identificationCardImage: ElementRef;
  @ViewChild('familyImage') familyCardImage: ElementRef;
  @ViewChild('nAddressImage') nationalAddressImage: ElementRef;
  @ViewChild('custSalaryImage') customerSalaryImage: ElementRef;
  Attachments = Attachments;
  attachments: { [key: string]: any } = {};
  previewImage: any;
  requestId: string;
  images: any = [] = [{
    index: 0,
    familyCardImageName: null
  },
  {
    index: 1,
    identificationCardImageName: null
  }];
  selectedImage: string = null;
  displayBasic2: boolean;

  constructor(
    private router: Router,
    private individualContractService: IndividualContractService,
    private footerLoaderService: FooterLoaderService,
    public indOrdersService: IndOrdersService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    public attachmentsService: AttachmentsService
  ) {
    this.footerLoaderService.footer.emit();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((response) => {
      this.requestId = response['requestid'];
      // requestId = 'D73D3F92-EC4B-425A-ABE9-86BF18D259C1'; // don't forget to delete

      this.indOrdersService.getAttachments(this.requestId).subscribe((response) => {
        debugger;
        let data = response.data;

        this.attachmentsService.images[Attachments.IdentificationCardImage] = data?.identificationCardImageName;
        this.attachmentsService.images[Attachments.FamilyCardImage] = data?.familyCardImageName;
        this.attachmentsService.images[Attachments.NationalAddressImage] = data?.nationalAddressImageName;
        this.attachmentsService.images[Attachments.CustomerSalaryImage] = data?.customerSalaryImageName;

        // this.renderer.setValue(
        //   this.identificationCardImage.nativeElement,
        //   data.familyCardImageName
        // );
      });
    });
  }

  onPrieviewImage(imageSelected: any) {
    if (!imageSelected.files || !imageSelected.files[0]) return;

    const file = imageSelected.files[0];

    this.priviewImage(file);
  }
  showModal(btn: HTMLButtonElement, index: number) {
    debugger;
    this.selectedImage = this.attachmentsService.images[index];
    if (this.selectedImage)
      btn.click()
  }

  priviewImage(imageSelected: any) {
    this.images[0] = this.previewImage;
    this.displayBasic2 = true;
    const reader = new FileReader();
    reader.onload = (e) => (this.previewImage = reader.result);
    reader.readAsDataURL(imageSelected);
  }
  save() {
    debugger;
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
    this.router.navigate(['/dashboard/ind-orders/ind-orders-details/', this.requestId]);
  }
  private async chkValidation(
    element: ElementRef,
    image: any,
    imageName: string
  ) {
    debugger;
    if (element.nativeElement.files && element.nativeElement.files[0]) {
      this.attachments[image] = element.nativeElement.files[0];
      this.attachments[imageName] = element.nativeElement.files[0].name;
      let imageBase64 = (await this.attachmentsService.getImageInBase64(
        element.nativeElement.files[0]
      )) as string;
      let s = imageBase64.split(',')[1];
      // let regex=new RegExp("^[\w/\:.-]+;base64,");
      // imageBase64=regex.exec(imageBase64);
      this.attachmentsService
        .uploadAttachments(this.requestId,
          imageName, s, element.nativeElement.files[0].name)
        .subscribe((s) => {

        });
    }
  }
  cancel() {
    this.router.navigate(['/dashboard/ind-orders/ind-orders-details/', this.requestId]);
  }

}
