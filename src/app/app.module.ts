import { DnnInterceptor, RuntimeSettings } from '@2sic.com/dnn-sxc-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { addBootstrapCSS } from './dev/add-bootstrap';
import { DnnDevSettings } from './dev/dnn-dev-settings';

import { CategoriesListComponent } from './categories/categories-list.component';
import { ReferenceOverviewComponent } from './references/overview/references-overview.component';
import { ReferenceOverviewItemComponent } from './references/overview-item/references-overview-item.component';
import { ReferenceDetailComponent } from './references/reference-detail/reference-detail.component';
import { ReferenceImageDirective } from './references/references-image.directive';
import { DataService } from './data/data.service';

const providers: Provider[] = [
  DnnInterceptor,
  DataService
];

if (!environment.production) {
  providers.push({ provide: RuntimeSettings, useValue: DnnDevSettings });
  addBootstrapCSS();
}

@NgModule({
  declarations: [
    AppComponent,
    CategoriesListComponent,
    ReferenceOverviewComponent,
    ReferenceOverviewItemComponent,
    ReferenceImageDirective,
    ReferenceDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
