import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';
import { BaseAPIResModel } from './base-api.models';

export type BatchNotifyReq = BatchNotifyByStatusReq | BatchNotifyByIDReq;

interface BatchNotifyByStatusReq {
  /**
   * 發送方式
   * 'status': 依申請單狀態
   * 'id': 依申請單編號
   */
  type: 'status';
  /**
   * 申請單狀態列表
   */
  applStatusList: Array<ApplStatuses>;
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
   * 發送方式
   * 'status': 依申請單狀態
   * 'id': 依申請單編號
   */
  type: 'id';
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
