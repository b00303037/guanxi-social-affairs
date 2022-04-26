import { BaseAPIResModel } from './base-api.models';

export interface ArrangeApplReq {
  /**
   * 申請單編號
   */
  applicationID: string;
  /**
   * 安排健檢日期，格式為 YYYY/MM/DD
   */
  scheduledDate: string;
}

export type ArrangeApplRes = BaseAPIResModel<null>;
