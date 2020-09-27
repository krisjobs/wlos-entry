import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountConverter'
})
export class AmountConverterPipe implements PipeTransform {

  transform(amount: number): string {
    return `-$${amount.toFixed(2)}`;
  }

}
