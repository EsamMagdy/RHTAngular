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
import { AttachmentsService } from 'src/app/company-services/attachments/attachments.service';
import { IndOrdersService } from '../../ind-orders.service';

@Component({
  selector: 'app-upload-attachments',
  templateUrl: './upload-attachments.component.html',
  styleUrls: ['./upload-attachments.component.css'],
})
export class UploadAttachmentsComponent implements OnInit {
  @ViewChild('identificationImage') identificationCardImage: ElementRef;
  @ViewChild('familyImage') familyCardImage: ElementRef;
  @ViewChild('nationalAddressImage') nationalAddressImage: ElementRef;
  @ViewChild('customerSalaryImage') customerSalaryImage: ElementRef;
  attachments: { [key: string]: any } = {};
  previewImage: any;
  images: any = [];

  displayBasic2: boolean;
  constructor(
    private router: Router,
    private individualContractService: IndividualContractService,
    private footerLoaderService: FooterLoaderService,
    public indOrdersService: IndOrdersService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.footerLoaderService.footer.emit();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((response) => {
      let requestId = response['requestid'];
      requestId = 'D73D3F92-EC4B-425A-ABE9-86BF18D259C1'; // don't forget to delete

      this.indOrdersService.getAttachments(requestId).subscribe((response) => {
        let data = response.data;

        this.renderer.setValue(
          this.identificationCardImage.nativeElement,
          data.familyCardImageName
        );
      });
    });
  }

  onPrieviewImage(imageSelected: any) {
    if (!imageSelected.files || !imageSelected.files[0]) return;

    const file = imageSelected.files[0];
    console.log(file);

    this.priviewImage(file);
  }
  priviewImage(imageSelected: any) {
    this.images[0] = this.previewImage;
    this.displayBasic2 = true;
    const reader = new FileReader();
    reader.onload = (e) => (this.previewImage = reader.result);
    reader.readAsDataURL(imageSelected);
  }
  save() {

  }
  cancel() {
    this.router.navigate(['']);
  }

}
