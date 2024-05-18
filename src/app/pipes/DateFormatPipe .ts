import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateFormat',
    standalone:true
  })
  export class DateFormatPipe implements PipeTransform {
    transform(date: Date): string {
      const value = new Date(date);
      const formattedDate = `${value.getFullYear()}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${value.getDate().toString().padStart(2, '0')} ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}:${value.getSeconds().toString().padStart(2, '0')}`;
      return formattedDate;
    }
  }