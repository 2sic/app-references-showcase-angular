import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { Image } from '../shared/interfaces/image.interface';
import { Reference } from '../shared/interfaces/references.interfaces';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.scss']
})
export class ReferenceDetailsComponent {

  servicesLabel: string;
  linksLabel: string;
  btnBack: string;

  reference: Reference;
  images$: Observable<Image[]>;

  constructor(
    route: ActivatedRoute,
    sxcData: SxcDataService,
  ) {

    sxcData.resources$.pipe(
      tap(resources => this.servicesLabel = resources.ServicesLabel),
      tap(resources => this.linksLabel = resources.LinksLabel),
      tap(resources => this.btnBack = resources.BackBtnLabel),
    ).subscribe();

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
  }
}
