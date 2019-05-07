import { Directive, Input } from '@angular/core';

@Directive({ 
    selector: 'img[refercenc-image]',
    host: {
        '[src]': 'src',
        '(error)': 'errorHandler($event)',
    },
})
export class ReferenceImageDirective {

    private fallbackUrl: string = 'https://via.placeholder.com/300/';

    @Input() public src: string;

    errorHandler(_error: ErrorEvent) {
        this.src = this.fallbackUrl;
    }
}