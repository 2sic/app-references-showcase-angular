import { Category } from './category.interfaces';

export interface Reference {
    Id: number;
    Title: string;
    Description: string;
    PreviewImage: string;
    Category: Array<Category>;
}
