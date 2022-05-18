import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { asValid, isEmpty } from './validator-utils';

export function PasswordMatchValidator(
  fcNameA: string,
  fcNameB: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fcA = control.get(fcNameA) as AbstractControl;
    const fcB = control.get(fcNameB) as AbstractControl;

    const passwordA: string | null = fcA.value;
    const passwordB: string | null = fcB.value;

    if (
      asValid(fcA) ||
      asValid(fcB) ||
      isEmpty(passwordA) ||
      isEmpty(passwordB)
    ) {
      return null;
    }

    if (!isEmpty(passwordA) && !isEmpty(passwordB) && passwordA === passwordB) {
      return null;
    }

    return { passwordMatch: true };
  };
}

export class PasswordMatchErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return (
      !asValid(control) && (control.invalid || form.hasError('passwordMatch'))
    );
  }
}
