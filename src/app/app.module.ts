import { DnnInterceptor, RuntimeSettings } from '@2sic.com/dnn-sxc-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryButtonComponent } from './categories/category-button/category-button.component';
import { addBootstrapCSS } from './dev/add-bootstrap';
import { DnnDevSettings } from './dev/dnn-dev-settings';
import { OverviewComponent } from './overview/overview.component';
import { ReferenceDetailsComponent } from './reference-details/reference-details.component';
import { ReferenceItemComponent } from './references/reference-item/reference-item.component';
import { ReferencesComponent } from './references/references.component';


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
    ReferencesComponent,
    OverviewComponent,
    ReferenceItemComponent,
    ReferenceDetailsComponent,
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
