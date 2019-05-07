import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../data/categories.interfaces';
import { DataService } from '../data/data.service';

@Component({
    selector: 'categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {

    public categories: Observable<Category[]>;

    constructor(
        private data: DataService,
    ) {
    }

    ngOnInit() {
        this.categories = this.data.categoryByPriority();
    }

    select(category: Category) {
        this.data.setSelectedCategory(category);
    }
}