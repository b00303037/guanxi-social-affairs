import { BaseAPIResModel } from './base-api.models';

export type VerifyReq = ApplyVerifyReq | QueryVerifyReq;

interface ApplyVerifyReq {
  /**
   * 操作別
   * 'apply': 線上申請
   * 'query': 申請查詢
   */
  action: 'apply';
  /**
   * 身分證字號
   */
  IDNo: string;
  /**
   * 密碼
   */
  password?: string;
  /**
   * 圖形驗證碼
   */
  captcha: string;
}

interface QueryVerifyReq {
  /**
   * 操作別
   * 'apply': 線上申請
   * 'query': 申請查詢
   */
  action: 'query';
  /**
   * 身分證字號
   */
  IDNo: string;
  /**
   * 密碼
   */
  password: string;
  /**
   * 圖形驗證碼
   */
  captcha: string;
}

export type VerifyRes = BaseAPIResModel<{
  /**
   * JWT token
   */
  token: string;
  /**
   * 是否存在申請紀錄
   */
  hasApplied: boolean;
}>;
