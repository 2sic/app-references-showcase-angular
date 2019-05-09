import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferenceDetailComponent } from './references/reference-detail/reference-detail.component';
import { ReferenceOverviewComponent } from './references/overview/references-overview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cat/all' },
  { path: 'cat/:category', component: ReferenceOverviewComponent },
  { path: 'reference/:referenceTitle', component: ReferenceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
