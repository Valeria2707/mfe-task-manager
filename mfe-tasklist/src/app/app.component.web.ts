import { createCustomElement } from '@angular/elements';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).then((appRef) => {
  const element = createCustomElement(AppComponent, {
    injector: appRef.injector,
  });
  customElements.define('app-root', element);
});
