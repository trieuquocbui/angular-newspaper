export class PagenationModel<T>{
    content!:Array<T>;
    pageNumber!:number;
    pageSize!:number;
    totalPages!:number;
    totalElements!:number;
    lastPage!:boolean;
}