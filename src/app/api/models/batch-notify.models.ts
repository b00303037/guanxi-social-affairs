import { BaseAPIResModel } from './base-api.models';

export type BatchNotifyReq = BatchNotifyByStatusReq | BatchNotifyByIDReq;

interface BatchNotifyByStatusReq {
  /**
   * 申請單狀態
   */
  applStatusList: string;
  /**
   * 主旨
   */
  subject: string;
  /**
   * 內容
   */
  body: string;
}
interface BatchNotifyByIDReq {
  /**
   * 申請單編號列表
   */
  applIDList: Array<string>;
  /**
   * 主旨
   */
  subject: string;
  /**
   * 內容
   */
  body: string;
}

export type BatchNotifyRes = BaseAPIResModel<null>;
