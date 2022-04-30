import { YN } from '../../shared/enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';

export interface UpdateHCProgramReq {
  /**
   * 編號
   */
  programID: number;
  /**
   * 名稱
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 費用
   */
  charge?: number;
  /**
   * 啟用狀態
   * 'Y': 啟用
   * 'N': 停用
   */
  enabled?: YN;
}

export type UpdateHCProgramRes = BaseAPIResModel<null>;
