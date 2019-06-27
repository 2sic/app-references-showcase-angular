import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ReferenceDetailsComponent } from './reference-details/reference-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'category/all' },
  { path: 'category/:category', component: OverviewComponent },
  { path: 'reference/:reference', component: ReferenceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
