import { BaseAPIResModel } from './base-api.models';

export interface LoginReq {
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
   * 圖形驗證碼
   */
  captcha: string;
}

export type LoginRes = BaseAPIResModel<{
  /**
   * JWT token
   */
  token: string;
}>;
