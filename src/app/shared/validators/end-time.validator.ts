import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { asValid, isEmpty } from './validator-utils';

export function EndTimeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const endDateFC = control.get('endDate') as AbstractControl;
  const endHoursFC = control.get('endHours') as AbstractControl;
  const endMinutesFC = control.get('endMinutes') as AbstractControl;

  const endDate: Date | null = endDateFC.value;
  const endHours: number | null = endHoursFC.value;
  const endMinutes: number | null = endMinutesFC.value;

  if (asValid(endDateFC) || asValid(endHoursFC) || asValid(endMinutesFC)) {
    return null;
  }

  if (isEmpty(endDate) && isEmpty(endHours) && isEmpty(endMinutes)) {
    return null;
  }

  if (!isEmpty(endDate) && !isEmpty(endHours) && !isEmpty(endMinutes)) {
    return null;
  }

  return { endTime: true };
}

export class EndTimeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return !asValid(control) && (control.invalid || form.hasError('endTime'));
  }
}
