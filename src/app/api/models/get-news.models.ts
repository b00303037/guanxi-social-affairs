import { BaseAPIResModel } from './base-api.models';
import { NewsInList } from './get-news-list.models';

export interface GetNewsReq {
  /**
   * 編號
   */
  newsID: number;
}

export type GetNewsRes = BaseAPIResModel<News>;

export interface News extends NewsInList {
  /**
   * 內容，格式為 HTML
   */
  content: string;
}
