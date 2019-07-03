import { Component, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SxcDataService } from 'src/app/core/services/sxc-data/sxc-data.service';
import { Reference } from 'src/app/shared/interfaces/references.interfaces';

@Component({
  selector: 'app-reference-item',
  templateUrl: './reference-item.component.html',
  styleUrls: ['./reference-item.component.scss']
})
export class ReferenceItemComponent {

  btnLabel: string;

  hasImgError = false;
  cropImgString = '?w=496&h=370&mode=crop&scale=both';

  private localReference: Reference;

  constructor(
    sxcData: SxcDataService,
  ) {
    sxcData.resources$.pipe(
      tap(resources => this.btnLabel = resources.DetailsBtnLabel),
    ).subscribe();
  }

  @Input()
  set reference(ref: Reference) {

    const charLimit = 40;
    this.localReference = ref;
    this.localReference.Description = this.parseHTMLToString(ref.Description);

    if (this.localReference.Description.length > charLimit) {
      const croped = this.localReference.Description.slice(0, charLimit);
      this.localReference.Description = croped + '...';
    }
  }

  get reference() {
    return this.localReference;
  }

  private parseHTMLToString(htmlStr: string) {
    const str = htmlStr.replace(/<[^>]*>/g, '');
    return str;
  }

}
