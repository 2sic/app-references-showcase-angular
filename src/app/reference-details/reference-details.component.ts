import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { Image } from '../shared/interfaces/image.interface';
import { Reference } from '../shared/interfaces/references.interfaces';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ReferenceDetailsComponent {

  servicesLabel: string;
  linksLabel: string;
  btnBack: string;

  loading = true;

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
    ).subscribe(() => this.loading = false);
  }
}
