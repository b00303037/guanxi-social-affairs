import { YN } from '../../shared/enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';

export type GetHospDataRes = BaseAPIResModel<HospData>;

export interface HospData {
  /**
   * 醫院列表
   */
  hospitalList: Array<HospDataHospital>;
  /**
   * 健檢項目列表
   */
  HCProgramList: Array<HospDataHCProgram>;
}

export interface HospDataHospital {
  /**
   * 編號
   */
  hospitalID: number;
  /**
   * 名稱
   */
  name: string;
  /**
   * 網站連結
   */
  siteUrl?: string;
  /**
   * 醫院檔案列表
   */
  hospFileList: Array<HospDataHospFile>;
  /**
   * 啟用狀態
   * 'Y': 啟用
   * 'N': 停用
   */
  enabled: YN;
}

export interface HospDataHCProgram {
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

export interface HospDataHospFile {
  /**
   * 檔案名稱
   */
  name: string;
  /**
   * 檔案連結
   */
  url: string;
}
