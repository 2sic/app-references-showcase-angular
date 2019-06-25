import { Component, ElementRef } from '@angular/core';
import { DnnAppComponent, Context } from '@2sic.com/dnn-sxc-angular';
import { SxcDataService } from './core/services/sxc-data/sxc-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends DnnAppComponent {
  constructor(
    el: ElementRef,
    context: Context,
    private sxcData: SxcDataService,
  ) {
      super(el, context);
  }
  title = 'showcase-references-angular';
}
