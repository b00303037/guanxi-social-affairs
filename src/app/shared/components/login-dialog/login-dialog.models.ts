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
