import { telephoneNoRegExp } from 'src/app/shared/validators/telephone-no.validator';
import { GENDER_MAP } from '../../shared/enums/gender.enum';
import { YN_MAP } from '../../shared/enums/yn.enum';
import { BaseAPIResModel } from './base-api.models';
import { ApplInList } from './get-appl-list.models';
import {
  HospData,
  HospDataHCProgram,
  HospDataHospital,
} from './get-hosp-data.models';

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
  imgBankbook: string;
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
  displayedImg: 'imgIDA' | 'imgIDB' | 'imgBankbook' | 'imgRegTranscript';
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
  { label: '存摺封面', key: 'imgBankbook' },
  { label: '戶籍謄本', key: 'imgRegTranscript' },
];

export function getExtendedAppl(appl: Appl, hospData: HospData): ExtendedAppl {
  const hospital = findHospital(appl.hospitalID, hospData.hospitalList);
  const program = findHCProgram(appl.programID, hospData.HCProgramList);

  return {
    ...appl,
    genderText: GENDER_MAP[appl.gender],
    hasCancerText: appl.hasCancer ? YN_MAP[appl.hasCancer] : '',
    hospitalName: hospital ? hospital.name : '',
    programName: program ? program.name : '',
    displayedImg: 'imgIDA',
  };
}

export function findHospital(
  hospitalID: number,
  hospitalList: Array<HospDataHospital>
): HospDataHospital | undefined {
  return hospitalList.find((h) => h.hospitalID === hospitalID);
}

export function findHCProgram(
  programID: number,
  HCProgramList: Array<HospDataHCProgram>
): HospDataHCProgram | undefined {
  return HCProgramList.find((p) => p.programID === programID);
}

export function getTelephoneNo(
  prefix: string | undefined,
  no: string | undefined,
  ext: string | undefined
): string {
  if (prefix && no) {
    return `${prefix}-${no}#${ext ?? ''}`;
  }

  return '';
}

export function getTelPrefixNoExt(
  telephoneNo: string | undefined | null
): [string | undefined, string | undefined, string | undefined] {
  let telPrefix = undefined;
  let telNo = undefined;
  let telExt = undefined;
  if (
    telephoneNo !== undefined &&
    telephoneNo !== null &&
    telephoneNoRegExp.test(telephoneNo)
  ) {
    const prefixAndOther = telephoneNo.split('-', 2);
    const noAndExt = prefixAndOther[1].split('#');

    telPrefix = prefixAndOther[0];
    telExt = noAndExt.splice(-1, 1)[0];
    telNo = noAndExt.join();
  }

  return [telPrefix, telNo, telExt];
}
