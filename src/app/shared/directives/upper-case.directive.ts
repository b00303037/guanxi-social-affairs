import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUpperCase]',
})
export class UpperCaseDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const { control } = this.control;

    if (control) {
      const { selectionStart, value } = target;

      control.setValue(value.toUpperCase());

      target.setSelectionRange(selectionStart, selectionStart);
    }
  }
}
