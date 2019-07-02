import { Category } from './category.interfaces';

export interface Reference {
    Id: number;
    Title: string;
    Description: string;
    PreviewImage: string;
    UrlPath: string;
    Category: Array<Category>;
    Services: string;
    Links: string;
}
