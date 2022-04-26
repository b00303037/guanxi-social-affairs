import { BaseAPIResModel } from './base-api.models';

export type GetSettingsRes = BaseAPIResModel<Settings>;

export interface Settings {
  /**
   * 每日身分證字號尾碼限制
   */
  IDNoSuffixList: Array<string>;
  /**
   * 設籍日期限制，格式為 YYYY/MM/DD
   */
  regDateMin: string;
  /**
   * 申請間隔限制，單位為年
   */
  applIntervalYears: number;
}
