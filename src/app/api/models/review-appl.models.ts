import { ApplStatuses } from '../enums/appl-status.enum';
import { BaseAPIResModel } from './base-api.models';

export interface ReviewApplReq {
  /**
   * 申請單編號
   */
  applicationID: string;
  /**
   * 申請單狀態
   */
  status: ApplStatuses.Y | ApplStatuses.N;
}

export type ReviewApplRes = BaseAPIResModel<null>;
