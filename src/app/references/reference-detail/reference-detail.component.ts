import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Reference } from 'src/app/data/references.interfaces';

@Component({
    selector: 'reference-detail',
    templateUrl: 'reference-detail.component.html'
})

export class ReferenceDetailComponent implements OnInit {

    constructor(
        public data: DataService,
        private router: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        if (!this.data.selectedReference) {
            this.router.params
                .subscribe( 
                    (params: Params) => { 
                        console.log({params});
                        const title = params['referenceTitle'];
                        this.data.references.subscribe(
                            (refs: Reference[]) => {
                                const found = refs.find( (r: Reference) => r.Title);
                            }
                        );
                    }, 
                    _error => this.back(),
                );
        }
    }

    back() {
        this.location.back();
    }
}