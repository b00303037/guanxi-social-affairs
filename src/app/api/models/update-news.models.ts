import { YN } from '../../shared/enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';

export interface UpdateNewsReq {
  /**
   * 編號
   */
  newsID: number;
  /**
   * 標題
   */
  title?: string;
  /**
   * 日期，格式為 YYYY/MM/DD
   */
  date?: string;
  /**
   * 內容，格式為 HTML
   */
  content?: string;
  /**
   * 是否於首頁輪播
   * 'Y': 是
   * 'N': 否
   */
  pinned?: YN;
  /**
   * 啟用狀態
   * 'Y': 啟用
   * 'N': 停用
   */
  enabled?: YN;
  /**
   * 開始時間，格式為 ISO 8601
   */
  startDatetime?: string;
  /**
   * 結束時間，格式為 ISO 8601
   */
  endDatetime?: string;
}

export type UpdateNewsRes = BaseAPIResModel<null>;
