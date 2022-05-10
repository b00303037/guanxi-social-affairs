import { AbstractControl } from '@angular/forms';

export interface LoginDialogData {
  role: 'govt' | 'hosp';
}

export type LoginDialogResult = boolean | undefined;

export interface LoginFormModel {
  role: 'govt' | 'hosp';
  username: string;
  password: string;
  captcha: string;
}
export interface LoginFCsModel {
  role: AbstractControl;
  username: AbstractControl;
  password: AbstractControl;
  captcha: AbstractControl;
}
