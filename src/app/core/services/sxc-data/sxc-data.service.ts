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

    constructor(
      private http: HttpClient,
      private context: Context,
      private data: Data
    ) {
      this.references$ = this.data.content<Reference>('Reference').get().pipe(shareReplay());
      this.categories$ = this.data.content<Category>('Category').get().pipe(shareReplay());
      this.resources$ = this.data.content<Resources>('Resources').get().pipe(
        map((resources: Resources[]) => resources[0]),
        shareReplay(),
      );
    }

    getImagesByReferenceId(referenceId: number): Observable<Image[]> {

      const params = new HttpParams().set('entityId', `${referenceId}`);
      const url = 'http://app-dev.2sxc.org/showcase-references-angular/DesktopModules/2sxc/API/app/auto/api/References/GetImages';

      // TODO: Dosen't work in production build, base href for api request is in correct set
      // If problem is fixed replace code with:
      // return this.data.api<Image[]>('References').get('GetImages', params);

      return combineLatest(
        this.context.moduleId$,
        this.context.tabId$,
      ).pipe(
        switchMap(([moduleId, tabId]) => {

          params.set('moduleId', `${moduleId}`);
          params.set('tabId', `${tabId}`);

          return this.http.get<Image[]>(url, {params});

        }),
      );
    }
}
