import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from './environments/environment';

// Registering Syncfusion license key
registerLicense(environment.SYNCFUSION_LICENSE);

registerLocaleData(fr.default);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
