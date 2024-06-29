import { FavouriteModel } from "./favourite";

export class UserModel{
    username!:string;
    fullName!:string;
    thumbnail!:string;
    favouriteList:FavouriteModel[] = [];
}