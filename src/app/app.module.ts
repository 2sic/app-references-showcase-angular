import { DnnInterceptor, RuntimeSettings } from '@2sic.com/dnn-sxc-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { addBootstrapCSS } from './dev/add-bootstrap';
import { DnnDevSettings } from './dev/dnn-dev-settings';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryButtonComponent } from './categories/category-button/category-button.component';

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
    CategoriesComponent,
    CategoryButtonComponent,
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
