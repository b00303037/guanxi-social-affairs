import { BaseAPIResModel } from './base-api.models';

export interface ChangePasswordReq {
  /**
   * 身分別
   * 'govt': 社會課
   * 'hosp': 醫院
   */
  role: 'govt' | 'hosp';
  /**
   * 使用者名稱
   */
  username: string;
  /**
   * 密碼
   */
  password: string;
  /**
   * 新密碼
   */
  newPassword: string;
}

export type ChangePasswordRes = BaseAPIResModel<null>;
