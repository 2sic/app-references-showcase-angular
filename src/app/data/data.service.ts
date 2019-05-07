import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './categories.interfaces';
import { Reference } from './references.interfaces';
import { Data } from '@2sic.com/dnn-sxc-angular';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

    public categories: Observable<Category[]> = null;
    public references: Observable<Reference[]> = null;

    public selectedCategory: Category = null;
    public selectedReference: Reference = null;

    constructor(private data: Data) {
        this.references = this.data.content<Reference>('Reference').get();

        this.categories = this.data.content<Category>('Category').get();

        this.categories.subscribe( (cats: Category[]) => console.log({cats}) );
        this.references.subscribe( (refs: Reference[]) => console.log({refs}) );
    }

    public categoryByPriority(): Observable<Category[]> {

        const sortPriority = 
            (cats: Category[]) =>
                cats.sort( 
                    (a: Category, b: Category) => +(a.Priority > b.Priority) || +(a.Priority === b.Priority) - 1 
                );

        return this.categories.pipe(map( (c: Category[]) => sortPriority(c) ));
    }

    public setSelectedCategory(category?: Category): void {
        this.selectedCategory = category || null;
    }

    public setSelectedReference(reference?: Reference): void {
        this.selectedReference = reference || null;
    }
}