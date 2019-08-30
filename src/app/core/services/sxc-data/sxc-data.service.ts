import { Context, Data } from '@2sic.com/dnn-sxc-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Image } from 'src/app/shared/interfaces/image.interface';
import { Resources } from 'src/app/shared/interfaces/resources.interface';
import { Category } from '../../../shared/interfaces/category.interfaces';
import { Reference } from '../../../shared/interfaces/references.interfaces';

@Injectable({providedIn: 'root'})
export class SxcDataService {

    categories$: Observable<Category[]>;
    references$: Observable<Reference[]>;
    resources$: Observable<Resources>;
    settings$: Observable<any>;

    constructor(
      private http: HttpClient,
      private context: Context,
      private data: Data
    ) {
      this.settings$ = this.data.query$<any>('All References and Settings').pipe(shareReplay());

      this.references$ = this.data.content<Reference>('Reference').get().pipe(map(v => v.sort((a,b) => a.CreateDate > b.CreateDate ? -1 : 1))).pipe(shareReplay());
      this.categories$ = this.data.content<Category>('Category').get().pipe(shareReplay());
      
      this.resources$ = this.data.content<Resources>('Resources').get().pipe(
        map((resources: Resources[]) => resources[0]),
        shareReplay(),
      );
    }

    getImagesByReferenceId(referenceId: number): Observable<Image[]> {

      const params = new HttpParams().set('entityId', `${referenceId}`);
      return this.data.api<Image[]>('References').get('GetImages', params);
    }
}
