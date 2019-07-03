import { Context, DnnAppComponent } from '@2sic.com/dnn-sxc-angular';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends DnnAppComponent {

  constructor(
    el: ElementRef,
    context: Context,
  ) {
    super(el, context);

    // TODO: Add Sxc-Toolbars
  }

}
