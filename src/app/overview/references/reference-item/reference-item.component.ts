import { Component, Input } from '@angular/core';
import { Reference } from 'src/app/shared/interfaces/references.interfaces';
import { SxcDataService } from 'src/app/core/services/sxc-data/sxc-data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-reference-item',
  templateUrl: './reference-item.component.html',
  styleUrls: ['./reference-item.component.scss']
})
export class ReferenceItemComponent {

  btnLabel: string;

  hasImgError = false;
  cropString = '?w=496&h=370&mode=crop&scale=both';

  @Input() reference: Reference;

  constructor(
    sxcData: SxcDataService,
  ) {
    sxcData.resources$.pipe(
      tap(resources => this.btnLabel = resources.DetailsBtnLabel),
    ).subscribe();
  }

}
