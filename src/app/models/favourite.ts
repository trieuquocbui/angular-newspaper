import { NewspaperModel } from "./newspaper";

export class FavouriteModel{
    id!: string;
    username!: string;
    newspaper!: NewspaperModel;
    datetime!: Date;
}