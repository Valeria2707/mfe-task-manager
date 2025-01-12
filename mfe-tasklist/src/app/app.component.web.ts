import { createCustomElement } from '@angular/elements';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).then((appRef) => {
  const element = createCustomElement(AppComponent, {
    injector: appRef.injector,
  });
  customElements.define('app-root', element);
});
