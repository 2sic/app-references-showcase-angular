import { Component, ElementRef, OnInit } from '@angular/core';
import { Context, Data, DnnAppComponent } from '@2sic.com/dnn-sxc-angular';

@Component({
    selector: 'categories-list',
    template: `List of all categories:<br> <div *ngFor="let category of categories">{{category.name}}</div>`
})
export class CategoriesListComponent implements OnInit {
    categories: Category[];

    constructor(
        private data: Data,
    ) {
    }

    ngOnInit() {
        this.data.content<Category>('Category').get()
            .subscribe(categories => this.categories = categories);
    }
}

class Category {
    name: string;
}