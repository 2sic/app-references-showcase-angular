import { Data } from '@2sic.com/dnn-sxc-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DnnDevSettings } from 'src/app/dev/dnn-dev-settings';
import { Image } from 'src/app/shared/interfaces/image.interface';
import { Resources } from 'src/app/shared/interfaces/resources.interface';
import { environment } from 'src/environments/environment';
import { Category } from '../../../shared/interfaces/category.interfaces';
import { Reference } from '../../../shared/interfaces/references.interfaces';

@Injectable({providedIn: 'root'})
export class SxcDataService {

    categories$: Observable<Category[]>;
    references$: Observable<Reference[]>;
    resources$: Observable<Resources>;

    constructor(
      private http: HttpClient,
      private location: Location,
      private data: Data
    ) {
      // TODO: Interfaces for Resources & Images

      this.references$ = this.data.content<Reference>('Reference').get().pipe(shareReplay());
      this.categories$ = this.data.content<Category>('Category').get().pipe(shareReplay());
      this.resources$ = this.data.content<Resources>('Resources').get().pipe(
        map((resources: Resources[]) => resources[0]),
        shareReplay(),
      );
    }

    getImagesByReferenceId(referenceId: number): Observable<Image[]> {

      // TODO: Workaround until 2sxc api is working correctly, replace with:
      // return this.data.api<Image[]>.get('Reference', referenceId);

      const domain = window.location.origin;
      const base = (this.location as any)._baseHref;
      const path = 'DesktopModules/2sxc/API/app/auto/api/References/GetImages';

      let moduleId = null;
      let tabId = null;

      if (environment.production) {
        const dnnModule = document.querySelector('.DnnModule');
        const context = JSON.parse(dnnModule.querySelector('.sc-content-block').getAttribute('data-edit-context'));
        moduleId = dnnModule.querySelector('a').getAttribute('name');
        tabId = (context as any).Environment.PageId;
      } else {
        moduleId = DnnDevSettings.moduleId;
        tabId = DnnDevSettings.tabId;
      }

      const url = `${domain}/${base}/${path}?entityId=${referenceId}&moduleId=${moduleId}&tabId=${tabId}`;

      return this.http.get<Image[]>(url);
    }
}
