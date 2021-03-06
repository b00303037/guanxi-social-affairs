import { Genders } from '../../shared/enums/gender.enum';
import { BaseAPIResModel } from './base-api.models';

export interface UpdateApplReq {
  /**
   * 申請單編號
   */
  applicationID: string;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 性別
   * 'M': 男
   * 'F': 女
   */
  gender?: Genders;
  /**
   * 出生日期，格式為 YYYY/MM/DD
   */
  birthDate?: string;
  /**
   * 設籍日期，格式為 YYYY/MM/DD
   */
  regDate?: string;
  /**
   * 村里
   */
  village?: string;
  /**
   * 詳細地址
   */
  address?: string;
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
   * 身分證正面圖檔，格式為 Base64
   */
  imgIDA?: string;
  /**
   * 身分證反面圖檔，格式為 Base64
   */
  imgIDB?: string;
  /**
   * 存摺封面圖檔，格式為 Base64
   */
  imgBankbook?: string;
  /**
   * 戶籍謄本圖檔，格式為 Base64
   */
  imgRegTranscript?: string;
  /**
   * 健檢項目 ID
   */
  programID?: number;
}

export type UpdateApplRes = BaseAPIResModel<null>;
