import { BaseAPIResModel } from './base-api.models';

export type GetSettingsRes = BaseAPIResModel<Settings>;

export interface Settings {
  /**
   * 每日身分證字號尾碼限制，次序為週日至週六
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
   * 下線日期時間限制，格式為 YYYY-MM-DDTHH:mm:ss.sssZ
   */
  closeDatetime: string;
  /**
   * 每日件數限制，單位為件
   */
  dailyApplLimit: string;
  /**
   * 年度件數限制，單位為件
   */
  yearlyApplLimit: string;
  /**
   * 申請年齡限制，單位為歲
   */
  minApplAge: string;
  /**
   * 暫停受理限制，資料為星期 ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT') 或日期 (格式為 YYYY/MM/DD)
   */
  applUnavailableWeekdayOrDateList: Array<string>;
  /**
   * 開放受理例外，資料為日期 (格式為 YYYY/MM/DD)
   */
  applAvailableDateList: Array<string>;
  /**
   * 每日開放時間限制，單位為時
   */
  applAvailableHourList: Array<string>;
}
