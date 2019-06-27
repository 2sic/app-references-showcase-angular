import { Component, Input } from '@angular/core';
import { Reference } from 'src/app/shared/interfaces/references.interfaces';

@Component({
  selector: 'app-reference-item',
  templateUrl: './reference-item.component.html',
  styleUrls: ['./reference-item.component.scss']
})
export class ReferenceItemComponent {

  @Input() reference: Reference;

}
