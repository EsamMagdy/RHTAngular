import { DisconnectedComponent } from './shared/components/internet-connection/disconnected/disconnected.component';
import { ConnectedComponent } from './shared/components/internet-connection/connected/connected.component';
import { InternetConnectionComponent } from './shared/components/internet-connection/internet-connection.component';
import { LoaderService } from './shared/services/loaderService.service';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavSocialComponent } from './nav-social/nav-social.component';
import { SharedModule } from './shared/modules/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { LoaderInterceptor } from './shared/interceptors/loaderInterceptor.service';
import { AuthInterceptorService } from './shared/interceptors/auth.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MyLoaderComponent } from './my-loader/my-loader.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavSocialComponent,
    MyLoaderComponent,
    InternetConnectionComponent,
    ConnectedComponent,
    DisconnectedComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    SharedModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
