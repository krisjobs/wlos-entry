import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logoPath'
})
export class LogoPathPipe implements PipeTransform {

  transform(logoPath: string): string {
    // return `src/assets/logos/texaco.png`;
    return `assets/logos/${logoPath}`;
  }

}
