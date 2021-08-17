import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseDataCRMForContractTemplate } from 'src/app/shared/models/responseDataCRM.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AttachmentsService {
  previewImage: any;
  images: any = [];
  displayBasic2: boolean;
  attachments: {
    index: number,
    name: any,
    localReference: any
  }[] = [
      {
        index: 0,
        name: 'identificationCardImage',
        localReference: 'identificationImage'
      }, {
        index: 1,
        name: 'familyCardImage',
        localReference: 'familyImage'
      },
      {
        index: 2,
        name: 'nationalAddressImage',
        localReference: 'nAddressImage'
      },
      {
        index: 3,
        name: 'customerSalaryImage',
        localReference: 'custSalaryImage'
      }
    ];

  constructor(
    private router: Router,
    private individualContractService: IndividualContractService,
    private http: HttpClient
  ) { }

  navigateToContractPage() { }

  chooseImage(image: any, index: any) {
    if (!image.files || !image.files[0]) return;

    let file = image.files[0];
    console.log(file);


    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    console.log(image);
    if (!validImageTypes.includes(fileType)) {
      file = null;
      image.value = null;
    }

    this.images[index] = URL.createObjectURL(file)
    console.table(this.images);

    return image;
  }

  onPrieviewImage(imageSelected: any) {
    if (!imageSelected.files || !imageSelected.files[0]) return;

    const file = imageSelected.files[0];
    console.log(file);

    return this.priviewImage(file);
  }
  priviewImage(imageSelected: any) {
    const reader = new FileReader();
    reader.onload = (e) => (this.previewImage = reader.result);
    reader.readAsDataURL(imageSelected);
    this.images[0] = this.previewImage;

    return this.previewImage;
  }

  getImageInBase64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  uploadAttachments(requestId: string, fieldName: string, imageBase: string, name: string) {
    return this.http.post<ResponseDataCRMForContractTemplate<string>>(
      environment.apiUrl + 'IndividualContractRequest/UploadAttachments',
      {
        Id: requestId,
        ImageBase: imageBase,
        Name: name,
        FieldName: fieldName,
      }
    );
  }

}
