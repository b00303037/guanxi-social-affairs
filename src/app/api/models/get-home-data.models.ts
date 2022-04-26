import { BaseAPIResModel } from './base-api.models';

export type GetHomeDataRes = BaseAPIResModel<HomeData>;

export interface HomeData {
  /**
   * 最新消息列表
   */
  newsList: Array<HomeDataNews>;
  /**
   * 申請件數
   */
  applCount: number;
  /**
   * 合作醫院數
   */
  hospCount: number;
}

export interface HomeDataNews {
  /**
   * 編號
   */
  newsID: number;
  /**
   * 標題
   */
  title: string;
  /**
   * 日期，格式為 YYYY/MM/DD
   */
  date: string;
}
