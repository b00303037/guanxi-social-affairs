import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { asValid, isEmpty } from './validator-utils';

export function StartTimeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const startDateFC = control.get('startDate') as AbstractControl;
  const startHoursFC = control.get('startHours') as AbstractControl;
  const startMinutesFC = control.get('startMinutes') as AbstractControl;

  const startDate: Date | null = startDateFC.value;
  const startHours: number | null = startHoursFC.value;
  const startMinutes: number | null = startMinutesFC.value;

  if (
    asValid(startDateFC) ||
    asValid(startHoursFC) ||
    asValid(startMinutesFC)
  ) {
    return null;
  }

  if (isEmpty(startDate) && isEmpty(startHours) && isEmpty(startMinutes)) {
    return null;
  }

  if (!isEmpty(startDate) && !isEmpty(startHours) && !isEmpty(startMinutes)) {
    return null;
  }

  return { startTime: true };
}

export class StartTimeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return !asValid(control) && (control.invalid || form.hasError('startTime'));
  }
}
