let lang = localStorage.getItem('lang') ?? 'ar';
export const environment = {
  production: true,
  apiUrl:`https://rao.sa:8004/${lang}/api/`,
  googleMapKey:'AIzaSyAlKMP7a65UobHAwUnPVTgZ49U-QmGaqpE'
  // apiUrl:`https://rao.sa:8019/${lang}/api/`
  // apiUrl: `https://rht.excprotection.com:8004/${lang}/api/`
  // apiUrl:`http://localhost:50/${lang}/api/`
};
