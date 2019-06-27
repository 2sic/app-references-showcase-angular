import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { Reference } from '../shared/interfaces/references.interfaces';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.scss']
})
export class ReferenceDetailsComponent {

  reference: Reference;

  constructor(
    route: ActivatedRoute,
    sxcData: SxcDataService,
    private location: Location,
  ) {

    // get reference via route parameter
    combineLatest(
      route.params,
      sxcData.references$,
    ).pipe(
      takeWhile(() => !this.reference),
      map(([params, references]) => references.find(ref => ref.UrlPath === params.reference) || null),
      tap(reference => this.reference = reference),
    ).subscribe();

  }

  navigateBack() {
    this.location.back();
  }
}
