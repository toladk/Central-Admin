

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';
import { apiPort } from './apiPort'

// if (environment.production) {
//   enableProdMode();
// }

if (apiPort.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
