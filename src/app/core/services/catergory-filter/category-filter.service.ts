import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService {

  selectedCategory$: Observable<Category>;
  private selectedCategorySubjet$ = new Subject<Category>();

  constructor() {
    this.selectedCategory$ = this.selectedCategorySubjet$;
  }

  updateSelectedCategory(category: Category) {
    this.selectedCategorySubjet$.next(category);
  }
}
