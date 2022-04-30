import { BaseAPICodes } from 'src/app/shared/enums/base-api-codes.enum';

export interface BaseAPIResModel<T> {
  /**
   * 是否成功
   */
  success: boolean;
  /**
   * 回覆代碼
   */
  code: BaseAPICodes;
  /**
   * 回覆訊息
   */
  message: string;
  /**
   * 回覆內容
   */
  content: T;
}
