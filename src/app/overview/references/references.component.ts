import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryFilterService } from '../../core/services/catergory-filter/category-filter.service';
import { Reference } from '../../shared/interfaces/references.interfaces';
import { Category } from 'src/app/shared/interfaces/category.interfaces';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {

  private _catFilter: CategoryFilterService;
  @Input() 
  set categoryFilter(cat: Category) {
    if(cat)
      this._catFilter.updateSelectedCategory(cat);;
  }

  references$: Observable<Reference[]>;

  constructor(
    catFilter: CategoryFilterService
  ) {
    this._catFilter = catFilter;
    this.references$ = catFilter.referencesBySelectedCategory$;
  }
}
