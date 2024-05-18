import { ParagraphModel } from "./paragrap";

export class NewspaperModel{
    id?:string;
    name!:string;
    topic!:string;
    origin!:string;
    datetime?:Date;
    author?:string;
    paragraphs!:ParagraphModel[];
}