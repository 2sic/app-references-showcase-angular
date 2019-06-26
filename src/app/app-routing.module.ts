import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'category/all' },
  { path: 'category', pathMatch: 'full', redirectTo: 'category/all' },
  { path: 'category/:category', component: CategoriesComponent },
  // { path: 'reference/:referenceTitle', component: ReferenceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
