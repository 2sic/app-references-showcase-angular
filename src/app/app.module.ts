import { DnnInterceptor, RuntimeSettings } from '@2sic.com/dnn-sxc-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { addBootstrapCSS } from './dev/add-bootstrap';
import { DnnDevSettings } from './dev/dnn-dev-settings';

const providers: Provider[] = [
  DnnInterceptor,
];

if (!environment.production) {
  providers.push({ provide: RuntimeSettings, useValue: DnnDevSettings });
  addBootstrapCSS();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
