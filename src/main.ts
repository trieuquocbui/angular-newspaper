import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// where to bootstraps Angular 
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
