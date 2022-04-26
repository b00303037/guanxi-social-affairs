import { YN } from '../enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';

export interface CompleteApplReq {
  /**
   * 申請單編號
   */
  applicationID: string;
  /**
   * 完成健檢日期，格式為 YYYY/MM/DD
   */
  completionDate: string;
  /**
   * 是否罹癌
   * 'Y': 是
   * 'N': 否
   */
  hasCancer: YN;
}

export type CompleteApplRes = BaseAPIResModel<null>;
