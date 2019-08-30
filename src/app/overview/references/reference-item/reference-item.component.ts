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
  referencesPage: string;
  /**
   * Defines if the module is placed on a page wich only shows one category
   * which means the links should go to the references page itself.
   */
  isCategoryPage = false;

  hasImgError = false;
  cropImgString = '?w=496&h=370&mode=crop&scale=both';

  @Input()
  reference: Reference;

  constructor(
    sxcData: SxcDataService,
  ) {
    sxcData.resources$.pipe(
      tap(resources => {
        this.btnLabel = resources.DetailsBtnLabel;
        this.referencesPage = resources.ReferencesPage;
      }),
    ).subscribe();
    sxcData.settings$.subscribe((s) => { this.isCategoryPage = s.Default[0].CategoryFilter.length > 0 });
  }

  get croppedDescription() {
    const charLimit = 40;
    let description = this.parseHTMLToString(this.reference.Description);

    if (description.length > charLimit)
      description = description.slice(0, charLimit) + '...';

    return description;
  }

  private parseHTMLToString(htmlStr: string) {
    const str = htmlStr.replace(/<[^>]*>/g, '');
    return str;
  }

}
