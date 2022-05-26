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
  maxRegDate: string;
  /**
   * 申請間隔限制，單位為年
   */
  applIntervalYears: string;
  /**
   * 圖檔大小限制，單位為 MB
   */
  maxImgSizeMB: string;
  /**
   * 上線日期時間限制，格式為 YYYY-MM-DDTHH:mm:ss.sssZ
   */
  launchDatetime: string;
  /**
   * 年度件數限制，單位為件
   */
  yearlyApplLimit: string;
  /**
   * 申請年齡限制，單位為歲
   */
  minApplAge: string;
}
