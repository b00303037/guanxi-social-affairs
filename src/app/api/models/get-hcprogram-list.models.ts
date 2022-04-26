import { YN } from '../enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';

export interface GetHCProgramListReq {}

export type GetHCProgramListRes = BaseAPIResModel<Array<HCProgram>>;

export interface HCProgram {
  /**
   * 編號
   */
  programID: number;
  /**
   * 名稱
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 費用
   */
  charge: number;
  /**
   * 啟用狀態
   * 'Y': 啟用
   * 'N': 停用
   */
  enabled: YN;
  /**
   * 醫院編號
   */
  hospitalID: number;
}
