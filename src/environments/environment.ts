// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  showLoader: false,
  serviceUrl: 'http://127.0.0.1:8000/',
  storageBase: 'http://127.0.0.1:8000/storage/',
  jobApplicationCvImgBase: 'http://127.0.0.1:8000/main-esylang/images/exercise/cv/',

  esylangTeams: {
    teacher: 100,
    depratment: 101,
    admin: 102,
    superAdmin: 103,
    student: 104,
  }
    // serviceUrl: 'https://esylangapi.thenetbees.com/',
    // storageBase: 'https://esylangapi.thenetbees.com/storage/',
    // jobApplicationCvImgBase: 'https://thenetbees.com/main-esylang/images/exercise/cv/',

    // serviceUrl: 'https://api.esylang.com/',
    // storageBase: 'https://api.esylang.com/storage/',
    // jobApplicationCvImgBase: 'https://esylang.com/images/exercise/cv/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
