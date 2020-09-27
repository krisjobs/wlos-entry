import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAmountInput]'
})
export class AmountInputDirective {

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
    this.validateFields(event);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      const regexed = (this.el.nativeElement.value as string)
        .replace(/[^0-9.]/g, '')    // remove everything except numbers and dot
        .replace(/(\.)(?=.*\1)/g, "")    // replace decimal dot (if more than one)
        .replace(/\s/g, '')    // remove whitespace

      const dotIndex = regexed.indexOf('.');

      this.el.nativeElement.value = dotIndex > -1 ? regexed.substr(0, regexed.indexOf('.') + 3) : regexed;
      event.preventDefault();

    }, 100)
  }

}
