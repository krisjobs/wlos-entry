import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(timestamp: number): string {
    const datetime = new Date(timestamp);
    const month = datetime.toLocaleString('default', { month: 'long' });
    return `${month.substr(0,3)}${month.length > 3 ? '.': ''} ${datetime.getDate()}`;
  }

}
