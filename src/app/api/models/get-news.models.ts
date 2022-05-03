import { parse } from 'date-fns';
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

export function getDatetime(
  date: Date | undefined,
  hours: number | undefined,
  minutes: number | undefined
): string {
  if (date && hours !== undefined && minutes !== undefined) {
    return parse(`${hours}:${minutes}:0 0`, 'H:m:s S', date).toISOString();
  }

  return '';
}
