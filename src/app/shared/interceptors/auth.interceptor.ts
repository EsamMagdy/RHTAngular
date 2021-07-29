import { GetSignature } from './../services/getSignature.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,
    private translateService: TranslateService,
    private getSignature: GetSignature) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userSb.pipe(
      take(1),
      exhaustMap((user) => {
        
        if (req.url.indexOf('https://maps.googleapis.com') !== -1) return next.handle(req);

        // let url = '';
        // let lang = localStorage.getItem('lang');
        // if (lang)
        //   url = req.url.replace('lang', lang);
        // else
        //   url = req.url.replace('lang', 'ar');
        const modifiedReq = req.clone({
          headers: req.headers.append('source', '2'),
          // url: url
        });

        if (!user) return next.handle(modifiedReq);

        let apikey = "UGFzc05BU0FQSUBOYXNBUElVc2VyMTIzQFBhc3M6TmFzQVBJVXNlcjEyM0B1c2Vy#";
        let timex = Math.floor(1000 + Math.random() * 9000);
        let sign = this.getSignature.getSignature(req.url, timex);
        const modifiedReqAuth = req.clone({
          headers: new HttpHeaders({
            "Accept": 'application/json, text/plain, /',
            "content-type": 'application/json',
            "cache-control": "no-cache",
            'source': '2',
            'Authorization': 'bearer ' + user.token,
            'TimeX': timex.toString(),
            'SignAuth': apikey.toString() + "" + sign.toString(),
          })
        });

        // modifiedReq.headers.append('Authorization', 'bearer ' + user.token);
        return next.handle(modifiedReqAuth);
      })
    );
  }
}
