export enum BaseAPICodes {
  SUCCESS = '000',
  FIELD_ERROR = '100',
  UNEXPECTED_ERROR = '400',
}

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
