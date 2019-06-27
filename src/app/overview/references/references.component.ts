import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryFilterService } from '../core/services/catergory-filter/category-filter.service';
import { Reference } from '../shared/interfaces/references.interfaces';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {

  references$: Observable<Reference[]>;

  constructor(
    catFilter: CategoryFilterService,
  ) {
    this.references$ = catFilter.referencesBySelectedCategory$;
  }
}
