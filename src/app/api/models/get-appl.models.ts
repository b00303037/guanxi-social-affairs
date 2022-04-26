import { GENDER_MAP } from '../enums/gender.enum';
import { YN_MAP } from '../enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';
import { ApplInList } from './get-appl-list.models';
import { HospData } from './get-hosp-data.models';

export interface GetApplReq {
  /**
   * 申請單編號
   */
  applicationID: string;
}

export type GetApplRes = BaseAPIResModel<Appl>;

export interface Appl extends ApplInList {
  /**
   * 身分證正面圖檔，格式為 Base64
   */
  imgIDA: string;
  /**
   * 身分證反面圖檔，格式為 Base64
   */
  imgIDB: string;
  /**
   * 存摺封面圖檔，格式為 Base64
   */
  imgBankBook: string;
  /**
   * 戶籍謄本圖檔，格式為 Base64
   */
  imgRegTranscript: string;
}

export interface ExtendedAppl extends Appl {
  genderText: string;
  hasCancerText?: string;
  hospitalName: string;
  programName: string;
  displayedImg: 'imgIDA' | 'imgIDB' | 'imgBankBook' | 'imgRegTranscript';
}

interface Property {
  label: string;
  key: string;
}

export const DETAIL_PROPERTY_LIST: Array<Property> = [
  { label: '身分證字號', key: 'IDNo' },
  { label: '性別', key: 'genderText' },
  { label: '出生日期', key: 'birthDate' },
  { label: '設籍日期', key: 'regDate' },
  { label: 'Email', key: 'email' },
  { label: '行動電話', key: 'mobileNo' },
  { label: '住家電話', key: 'telephoneNo' },
  { label: '安排健檢日期', key: 'scheduledDate' },
  { label: '完成健檢日期', key: 'completionDate' },
  { label: '是否罹癌', key: 'hasCancerText' },
  { label: '健檢醫院', key: 'hospitalName' },
  { label: '健檢項目', key: 'programName' },
];
export const IMG_PROPERTY_LIST: Array<Property> = [
  { label: '身分證正面', key: 'imgIDA' },
  { label: '身分證反面', key: 'imgIDB' },
  { label: '存摺封面', key: 'imgBankBook' },
  { label: '戶籍謄本', key: 'imgRegTranscript' },
];

export function extendAppl(appl: Appl, hospData: HospData): ExtendedAppl {
  const hospital = hospData.hospitalList.find(
    (h) => h.hospitalID === appl.hospitalID
  );
  const program = hospData.HCProgramList.find(
    (p) => p.programID === appl.programID
  );

  return {
    ...appl,
    genderText: GENDER_MAP[appl.gender],
    hasCancerText: appl.hasCancer ? YN_MAP[appl.hasCancer] : '',
    hospitalName: hospital ? hospital.name : '',
    programName: program ? program.name : '',
    displayedImg: 'imgIDA',
  };
}
