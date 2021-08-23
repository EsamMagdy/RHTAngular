import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TranslationService {
    lang: string;
    direction: string;
    translate() {
        let lang = localStorage.getItem('lang');
        if (lang && lang == 'ar') {
            document.querySelector('link[rel="stylesheet"][href^="Bootstrap"]').remove();
            document.querySelector('link[rel="stylesheet"][href^="RHTStyle"]').remove();
            //      for development
            // this.loadStyle('RTLBootstrap.css');
            // this.loadStyles('RTLRHTStyle.css');

            //      for production
            // this.loadStyle('RTLBootstrap.ab29094ebc91ae1c5dd3.css');
            // this.loadStyles('RTLRHTStyle.1aa783dc4505dce4d5be.css');

            this.direction = 'rtl';
            // this.loadStyles('/assets/css/rtl/bootstrap.min.css');
        } else if (lang && lang == 'en') {
            document.querySelector('link[rel="stylesheet"][href^="RTLBootstrap"]').remove();
            document.querySelector('link[rel="stylesheet"][href^="RTLRHTStyle"]').remove();
            //      for development
            // this.loadStyle('Bootstrap.css');
            // this.loadStyles('RHTStyle.css');

            //      for production
            // this.loadStyle('Bootstrap.a16d6b2cb82516868a8b.css');
            // this.loadStyles('RHTStyle.de225378483db3de2c96.css');

            this.direction = 'ltr';
        } else {
            document.querySelector('link[rel="stylesheet"][href^="Bootstrap"]').remove();
            document.querySelector('link[rel="stylesheet"][href^="RHTStyle"]').remove();
            //      for development
            // this.loadStyle('RTLBootstrap.css');
            // this.loadStyles('RTLRHTStyle.css');

            //      for production
            // this.loadStyle('RTLBootstrap.ab29094ebc91ae1c5dd3.css');
            // this.loadStyles('RTLRHTStyle.1aa783dc4505dce4d5be.css');

            this.direction = 'rtl';
            localStorage.setItem('lang', 'ar');
        }
        const htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
        htmlTag.dir = this.direction;
        htmlTag.lang = lang ?? 'ar';
        return this.lang;
    }
}