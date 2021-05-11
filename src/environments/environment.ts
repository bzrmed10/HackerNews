// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_URL : "https://hacker-news.firebaseio.com/v0/",
  API_BASE_URL_SEARCH : "https://hn.algolia.com/api/v1/search_by_date?query=",
  API_BASE_URL_TAG : "http://hn.algolia.com/api/v1/search_by_date?tags="
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
