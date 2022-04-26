import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { asValid, isEmpty } from './validator-utils';

export function MobileNoValidator(
  control: AbstractControl
): ValidationErrors | null {
  const mobileNo: string | null = control.value;

  if (isEmpty(mobileNo) || asValid(control)) {
    return null;
  }

  if (mobileNoRegExp.test(mobileNo as string)) {
    return null;
  }

  return { mobileNo: true };
}

export function EmailOrMobileNoValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailFC = control.get('email') as AbstractControl;
  const mobileNoFC = control.get('mobileNo') as AbstractControl;

  const email: string | null = emailFC.value;
  const mobileNo: string | null = mobileNoFC.value;

  if (asValid(emailFC) && asValid(mobileNoFC)) {
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

  if (asValid(telPrefixFC) && asValid(telNoFC) && asValid(telExtFC)) {
    return null;
  }

  if (isEmpty(telPrefix) && isEmpty(telNo) && isEmpty(telExt)) {
    return null;
  }

  if (
    !isEmpty(telPrefix) &&
    !isEmpty(telNo) &&
    telPrefixRegExp.test(telPrefix as string) &&
    telNoRegExp.test(telNo as string) &&
    (isEmpty(telExt) || telExtRegExp.test(telExt as string))
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

const mobileNoRegExp: RegExp = /^$|^09[0-9]{8}$/;
const telPrefixRegExp: RegExp = /^0[0-9]{1,2}$/;
const telNoRegExp: RegExp = /^[0-9]{6,8}$/;
const telExtRegExp: RegExp = /^[0-9]{0,6}$/;
