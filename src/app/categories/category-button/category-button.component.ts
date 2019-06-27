import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category.interfaces';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent {

  @Input() category: Category;
  @Output() selectCategory = new EventEmitter<Category>();

  routerParam = '/category';

  select(): void {
    this.selectCategory.emit(this.category);
  }
}
