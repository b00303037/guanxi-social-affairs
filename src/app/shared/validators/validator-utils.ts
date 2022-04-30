import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isAfter, isBefore } from 'date-fns';

interface DateRange {
  min?: Date;
  max?: Date;
}

export function DateRangeValidator(range: DateRange): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date: Date | null = control.value;
    const { min, max } = range;

    if (isEmpty(date) || asValid(control)) {
      return null;
    }

    if (min === undefined && max === undefined) {
      return null;
    }

    if (
      (min === undefined || isAfter(date as Date, min)) &&
      (max === undefined || isBefore(date as Date, max))
    ) {
      return null;
    }

    return { dateRange: true };
  };
}

export function isEmpty(value: unknown): boolean {
  return value === '' || value === null || value === undefined;
}

export function asValid(control: AbstractControl): boolean {
  return control.untouched && control.pristine;
}
