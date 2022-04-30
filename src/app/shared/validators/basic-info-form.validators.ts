import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
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

export function TelephoneNoValidator(
  control: AbstractControl
): ValidationErrors | null {
  const telPrefixFC = control.get('telPrefix') as AbstractControl;
  const telNoFC = control.get('telNo') as AbstractControl;
  const telExtFC = control.get('telExt') as AbstractControl;

  const telPrefix: string | null = telPrefixFC.value;
  const telNo: string | null = telNoFC.value;
  const telExt: string | null = telExtFC.value;

  if (
    (asValid(telPrefixFC) || asValid(telNoFC)) &&
    telExtFC.untouched &&
    telExtFC.pristine
  ) {
    return null;
  }

  if (isEmpty(telPrefix) && isEmpty(telNo) && isEmpty(telExt)) {
    return null;
  }

  if (
    !isEmpty(telPrefix) &&
    !isEmpty(telNo) &&
    telephoneNoRegExp.test(`${telPrefix}-${telNo}#${telExt ?? ''}`)
  ) {
    return null;
  }

  return { telephoneNo: true };
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

export class TelephoneNoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return (
      !asValid(control) && (control.invalid || form.hasError('telephoneNo'))
    );
  }
}

export const mobileNoRegExp: RegExp = /09[0-9]{8}/;
export const telephoneNoRegExp: RegExp = /0[0-9]{1,2}-[0-9]{6,8}#[0-9]{0,6}/;
