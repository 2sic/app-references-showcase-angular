import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { combineLatest, Observable } from 'rxjs';
import { Resources } from '../shared/interfaces/resources.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  categoryFilter: any;
  resources$: Observable<Resources>;
  settings: any;
  dateNow = new Date();

  constructor(
    sxcData: SxcDataService,
  ) {
    this.resources$ = sxcData.resources$;

    combineLatest([sxcData.categories$, sxcData.settings$]).pipe(
      tap(result => this.settings = result[1]["Default"][0]),
      tap(result => this.categoryFilter = this.settings.CategoryFilter.length === 0 ? null : result[0].find(x => x.Id === this.settings.CategoryFilter[0].Id))
    ).subscribe();
  }

}
