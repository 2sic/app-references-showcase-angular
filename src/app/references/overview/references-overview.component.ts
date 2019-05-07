import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../data/data.service';
import { Reference } from '../../data/references.interfaces';

@Component({
    selector: 'references-overview',
    templateUrl: './references-overview.component.html',
    styleUrls: ['./references-overview.component.scss'],
})
export class ReferenceOverviewComponent implements OnInit {

    references: Observable<Reference[]>;

    constructor(private data: DataService) {}

    ngOnInit() {
        this.references = this.data.references;
    }
}