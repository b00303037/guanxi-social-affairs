import { Genders } from 'src/app/api/enums/gender.enum';

export interface VerificationFormModel {
  isFirstTime: boolean;
  IDNo: string;
  password?: string;
  captcha: string;
  passed: boolean;
}
export interface HCProgramFormModel {
  hospitalID: number;
  programID: number;
  programName: string;
  programCharge: string;
}
export interface BasicInfoFormModel {
  newPassword?: string;
  name: string;
  gender: Genders;
  birthDate: Date;
  regDate: Date;
  email?: string;
  mobileNo?: string;
  telPrefix?: string;
  telNo?: string;
  telExt?: string;
}
export interface IDPhotosFormModel {
  imgIDA: string;
  imgIDB: string;
  imgBankbook: string;
  imgRegTranscript: string;
  passed: boolean;
}
