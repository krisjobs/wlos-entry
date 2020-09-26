import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(timestamp: number): string {
    const datetime = new Date(timestamp);
    return `${datetime.toLocaleString('default', { month: 'long' }).substr(0,3)}. ${datetime.getDate() + 1}`;
  }

}
