import { AbstractControl } from '@angular/forms';

export interface ChangePasswordFormModel {
  username: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}
export interface ChangePasswordFCsModel {
  username: AbstractControl;
  password: AbstractControl;
  newPassword: AbstractControl;
  confirmPassword: AbstractControl;
}
