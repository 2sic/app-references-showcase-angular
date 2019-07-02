import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { CategoryFilterService } from '../../core/services/catergory-filter/category-filter.service';
import { SxcDataService } from '../../core/services/sxc-data/sxc-data.service';
import { Category } from '../../shared/interfaces/category.interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories$: Observable<Category[]>;

  private allCategory: Category = { Id: null, Name: 'All', UrlPath: 'all', Priority: 0 };

  constructor(
    sxcData: SxcDataService,
    catFilter: CategoryFilterService,
    route: ActivatedRoute,
  ) {

    sxcData.resources$.pipe(
      tap(resources => this.allCategory.Name = resources.AllCategoriesBtnLabel),
    ).subscribe();

    // add 'select all' option
    this.categories$ = sxcData.categories$.pipe(
      map(categories => [this.allCategory, ...categories]),
    );

    // check url parameters for selected category
    combineLatest(
      route.params,
      this.categories$,
    ).pipe(
      takeUntil(catFilter.selectedCategory$),
      map(([params, categories]) => categories.find(cat => params.category === cat.UrlPath) || this.allCategory),
      tap(select => catFilter.updateSelectedCategory(select)),
    ).subscribe();

  }
}
