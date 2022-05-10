import { AbstractControl } from '@angular/forms';

export interface VerificationFormModel {
  IDNo: string;
  password: string;
  captcha: string;
  passed: boolean;
}
export interface VerificationFCsModel {
  IDNo: AbstractControl;
  password: AbstractControl;
  captcha: AbstractControl;
  passed: AbstractControl;
}
