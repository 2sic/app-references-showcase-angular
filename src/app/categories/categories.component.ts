import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CategoryFilterService } from '../core/services/catergory-filter/category-filter.service';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { Category } from '../shared/interfaces/category.interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;
  selectedCategory$: Observable<Category>;

  allCategory: Category = { Id: null, Name: 'All', UrlPath: 'all', Priority: 0 };

  constructor(
    private route: ActivatedRoute,
    private sxcData: SxcDataService,
    private catFilter: CategoryFilterService,
  ) { }

  ngOnInit() {
    this.categories$ = this.sxcData.categories$;
    this.selectedCategory$ = this.catFilter.selectedCategory$;

    this.selectedCategory$ = combineLatest(
      this.categories$,
      this.route.params,
    ).pipe(
      map(([categories, params]) => {
        return categories.find(cat => cat.UrlPath === params.category) || this.allCategory;
      }),
      tap(category => this.selectCategory(category)),
    );
  }

  selectCategory(category: Category) {
    this.catFilter.updateSelectedCategory(category);
  }

}
