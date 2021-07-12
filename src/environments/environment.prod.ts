let lang = localStorage.getItem('lang') ?? 'ar';
export const environment = {
  production: true,
  apiUrl: `https://rao.sa:8004/${lang}/api/`
  // apiUrl: `https://rht.excprotection.com:8004/${lang}/api/`
  // apiUrl:`http://localhost:50/${lang}/api/`
};
