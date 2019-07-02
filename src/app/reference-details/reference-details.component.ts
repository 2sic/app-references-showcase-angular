import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { Reference } from '../shared/interfaces/references.interfaces';
import { Image } from '../shared/interfaces/image.interface';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.scss']
})
export class ReferenceDetailsComponent {

  reference: Reference;
  images$: Observable<Image[]>;

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
      tap(reference => this.images$ = sxcData.getImagesByReferenceId(reference.Id)),
      tap(reference => this.reference = reference),
    ).subscribe();

    this.images$.subscribe(img => console.log({img}));
  }

  navigateBack() {
    this.location.back();
  }
}
