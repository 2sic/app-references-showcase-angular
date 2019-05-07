import { Component, Input } from '@angular/core';
import { Category } from 'src/app/data/categories.interfaces';
import { DataService } from 'src/app/data/data.service';

import { Reference } from '../../data/references.interfaces';

@Component({
    selector: 'references-overview-item',
    templateUrl: './references-overview-item.component.html',
    styleUrls: ['./references-overview-item.component.scss'],
})
export class ReferenceOverviewItemComponent {

    @Input() public reference: Reference = null;

    constructor (public data: DataService) {}

    public selectReference(reference: Reference) {
        this.data.setSelectedReference(reference);
    }

    filterByCategory() {
        return !this.data.selectedCategory || 
            !!(this.reference.Category.find( (c: Category) => c.Id === this.data.selectedCategory.Id ));
    }
}