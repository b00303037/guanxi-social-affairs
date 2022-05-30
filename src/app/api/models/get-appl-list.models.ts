import { ApplStatuses } from '../../shared/enums/appl-status.enum';
import { Genders } from '../../shared/enums/gender.enum';
import { YN } from '../../shared/enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';

export interface GetApplListReq {}

export type GetApplListRes = BaseAPIResModel<Array<ApplInList>>;

export interface ApplInList {
  /**
   * 編號
   */
  applicationID: string;
  /**
   * 申請單狀態
   * 'U': 待審核
   * 'X': 已取消（申請人於審核通過前取消；或社會課/醫院取消）
   * 'Y': 審核通過（社會課核定）
   * 'N': 待補正（社會課核定）
   * 'A': 已安排健檢（醫院核定）
   * 'C': 已完成健檢（醫院核定）
   */
  status: ApplStatuses;
  /**
   * 身分證字號
   */
  IDNo: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 性別
   * 'M': 男
   * 'F': 女
   */
  gender: Genders;
  /**
   * 出生日期，格式為 YYYY/MM/DD
   */
  birthDate: string;
  /**
   * 設籍日期，格式為 YYYY/MM/DD
   */
  regDate: string;
  /**
   * 村里
   */
  village: string;
  /**
   * 詳細地址
   */
  address: string;
  /**
   * Email
   */
  email?: string;
  /**
   * 行動電話
   */
  mobileNo?: string;
  /**
   * 住家電話，格式為 區碼-電話號碼#分機號碼
   */
  telephoneNo?: string;
  /**
   * 安排健檢日期，格式為 YYYY/MM/DD
   */
  scheduledDate?: string;
  /**
   * 完成健檢日期，格式為 YYYY/MM/DD
   */
  completionDate?: string;
  /**
   * 是否罹癌
   * 'Y': 是
   * 'N': 否
   */
  hasCancer?: YN;
  /**
   * 健檢醫院 ID
   */
  hospitalID: number;
  /**
   * 健檢項目 ID
   */
  programID: number;
  /**
   * 建立時間，格式為 ISO 8601
   */
  createDatetime: string;
  /**
   * 最後更新時間，格式為 ISO 8601
   */
  updateDatetime?: string;
}
