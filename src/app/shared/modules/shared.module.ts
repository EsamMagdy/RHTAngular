import { CheckIDNumberDirective } from './../directive/checkIDNumber.directives';
import { PreventNumberInInputTextDirective } from './../directive/preventNumberInInputText.directive';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { ScrollTopModule } from 'primeng/scrolltop';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/fileupload';
import { GMapModule } from 'primeng/gmap';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from "primeng/password";
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AgmCoreModule } from '@agm/core';
import { SafeHtmlPipe } from '../pipes/safeHtmlPipe.pipe';
import { MathRound } from '../pipes/mathRound.pipe';
import { CheckPasswordDirective } from '../directive/checkPasswordDirective.directive';
import { CheckEmailDirective } from '../directive/checkEmailDirective.directive';
import { CheckMobileDirective } from '../directive/checkMobile.directive';
import { AlertComponent } from '../components/alert/alert.component';
import {CarouselModule} from 'primeng/carousel';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { NgwWowModule } from 'ngx-wow';
import {GalleriaModule} from 'primeng/galleria';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FileName } from '../pipes/fileUploadName.pipe';
import { CheckImageDirective } from '../directive/image.directive';
import { CurrentDatePipe } from '../pipes/getCurrentDate.pipe';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SafeHtmlPipe,
    MathRound,
    FileName,
    CheckPasswordDirective,
    PreventNumberInInputTextDirective,
    CheckEmailDirective,
    CheckMobileDirective,
    CheckIDNumberDirective,
    AlertComponent,
    CheckImageDirective,
    CurrentDatePipe
],
  imports: [
    NgwWowModule,
    AnimateOnScrollModule.forRoot(),
    TranslateModule.forChild({
      loader: {

        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    ReactiveFormsModule,
    FormsModule,
    // BrowserAnimationsModule,
    CommonModule,
    DropdownModule,
    DialogModule,
    SkeletonModule,
    DividerModule,
    ScrollTopModule,
    PaginatorModule,
    GalleriaModule,
    FileUploadModule,
    GMapModule,
    ConfirmDialogModule,
    PasswordModule,
    HttpClientModule,
    RouterModule,
    MessageModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    CarouselModule,
    IvyCarouselModule,
    NgxSpinnerModule,
    CardModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [
    NgwWowModule,
    AnimateOnScrollModule,
    SafeHtmlPipe,
    MathRound,
    FileName,
    CheckPasswordDirective,
    PreventNumberInInputTextDirective,
    CheckEmailDirective,
    CheckMobileDirective,
    CheckIDNumberDirective,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    // BrowserAnimationsModule,
    CommonModule,
    DropdownModule,
    DialogModule,
    SkeletonModule,
    DividerModule,
    ScrollTopModule,
    PaginatorModule,
    GalleriaModule,
    FileUploadModule,
    GMapModule,
    ConfirmDialogModule,
    PasswordModule,
    HttpClientModule,
    RouterModule,
    MessageModule,
    ToastModule,
    AlertComponent,
    MessagesModule,
    MessageModule,
    CarouselModule,
    IvyCarouselModule,
    NgxSpinnerModule,
    CardModule,
    NgxPaginationModule,
    SweetAlert2Module,
    CheckImageDirective,
    CurrentDatePipe
  ]
})
export class SharedModule {
 
}