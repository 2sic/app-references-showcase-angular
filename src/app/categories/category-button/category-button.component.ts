import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category.interfaces';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent {

  @Input() category: Category;
  @Input() isSelected: boolean;

  @Output() selectCategory = new EventEmitter<Category>();

  routerParam = '/category';

  select() {
    this.selectCategory.emit(this.category);
  }
}
