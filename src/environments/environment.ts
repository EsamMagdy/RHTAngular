// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let lang=localStorage.getItem('lang')??'ar';
export const environment = {
  production: false,
  // apiUrl:`http://localhost:65066/${lang}/api/`
  apiUrl:`https://rao.sa:8019/${lang}/api/`
  // apiUrl:`https://rht.excprotection.com:8004/${lang}/api/`
  // apiUrl:`http://localhost:50/${lang}/api/`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
