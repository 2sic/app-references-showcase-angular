import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/interfaces/categories.interfaces';
import { Reference } from '../../../shared/interfaces/references.interfaces';
import { Data } from '@2sic.com/dnn-sxc-angular';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SxcDataService {

    categories$: Observable<Category[]>;
    references$: Observable<Reference[]>;

    constructor(
        private data: Data
    ) {
        this.references$ = this.data.content<Reference>('Reference').get();
        this.categories$ = this.data.content<Category>('Category').get();
    }
}