import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category.interfaces';
import { CategoryFilterService } from 'src/app/core/services/catergory-filter/category-filter.service';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent {

  @Input() category: Category;
  routerParam = '/category';

  constructor(
    private catFilter: CategoryFilterService,
  ) { }

  select(): void {
    this.catFilter.updateSelectedCategory(this.category);
  }
}
