import {
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { asValid, isEmpty } from './validator-utils';

export function MobileOrTelephoneNoValidator(
  control: AbstractControl
): ValidationErrors | null {
  const mobileNoFC = control.get('mobileNo') as AbstractControl;
  const telPrefixFC = control.get('telPrefix') as AbstractControl;
  const telNoFC = control.get('telNo') as AbstractControl;
  const telExtFC = control.get('telExt') as AbstractControl;

  const mobileNo: string | null = mobileNoFC.value;
  const telPrefix: string | null = telPrefixFC.value;
  const telNo: string | null = telNoFC.value;

  if (
    (asValid(telPrefixFC) || asValid(telNoFC) || asValid(mobileNoFC)) &&
    telExtFC.untouched &&
    telExtFC.pristine
  ) {
    return null;
  }

  if (!isEmpty(telPrefix) || !isEmpty(telNo) || !isEmpty(mobileNo)) {
    return null;
  }

  return { mobileOrTelephoneNo: true };
}

export class MobileOrTelephoneNoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return (
      !asValid(control) &&
      (control.invalid || form.hasError('mobileOrTelephoneNo'))
    );
  }
}
