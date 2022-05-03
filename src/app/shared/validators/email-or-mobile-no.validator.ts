import {
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { asValid, isEmpty } from './validator-utils';

export function EmailOrMobileNoValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailFC = control.get('email') as AbstractControl;
  const mobileNoFC = control.get('mobileNo') as AbstractControl;

  const email: string | null = emailFC.value;
  const mobileNo: string | null = mobileNoFC.value;

  if (asValid(emailFC) || asValid(mobileNoFC)) {
    return null;
  }

  if (!isEmpty(email) || !isEmpty(mobileNo)) {
    return null;
  }

  return { emailOrMobileNo: true };
}

export class EmailOrMobileNoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return (
      !asValid(control) && (control.invalid || form.hasError('emailOrMobileNo'))
    );
  }
}
