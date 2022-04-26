import { BaseAPIResModel } from './base-api.models';

export interface CancelApplReq {
  /**
   * 申請單編號
   */
  applicationID: string;
}

export type CancelApplRes = BaseAPIResModel<null>;
