import { AbstractControl } from '@angular/forms';

export function isEmpty(value: any): boolean {
  return value === '' || value === null;
}

export function asValid(control: AbstractControl): boolean {
  return control.untouched && control.pristine;
}
