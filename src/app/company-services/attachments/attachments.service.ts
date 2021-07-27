import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';

@Injectable({ providedIn: 'root' })
export class AttachmentsService {
  previewImage: any;
  images: any = [];
  displayBasic2: boolean;

  constructor(
    private router: Router,
    private individualContractService: IndividualContractService
  ) {}

  navigateToContractPage() {}

  chooseImage(image: any) {
    if (!image.files || !image.files[0]) return;

    let file = image.files[0];

    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    console.log(image);
    if (!validImageTypes.includes(fileType)) {
      file = null;
      image.value = null;
    }
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
}
