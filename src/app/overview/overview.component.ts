import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  title: string;

  constructor(
    sxcData: SxcDataService,
  ) {
    sxcData.resources$.pipe(
      tap(resources => this.title = resources.OverviewTitle),
    ).subscribe();
  }

}
