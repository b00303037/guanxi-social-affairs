import { AbstractControl } from '@angular/forms';
import { Genders } from 'src/app/shared/enums/gender.enum';

export interface VerificationFormModel {
  isFirstTime: boolean;
  IDNo: string;
  password?: string;
  captcha: string;
  passed: boolean;
}
export interface VerificationFCsModel {
  isFirstTime: AbstractControl;
  IDNo: AbstractControl;
  password: AbstractControl;
  captcha: AbstractControl;
  passed: AbstractControl;
}

export interface HCProgramFormModel {
  hospitalID: number;
  programID: number;
  programName: string;
  programCharge: string;
}
export interface HCProgramFCsModel {
  hospitalID: AbstractControl;
  programID: AbstractControl;
  programName: AbstractControl;
  programCharge: AbstractControl;
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
export interface BasicInfoFCsModel {
  newPassword: AbstractControl;
  name: AbstractControl;
  gender: AbstractControl;
  birthDate: AbstractControl;
  regDate: AbstractControl;
  email: AbstractControl;
  mobileNo: AbstractControl;
  telPrefix: AbstractControl;
  telNo: AbstractControl;
  telExt: AbstractControl;
}

export interface IDPhotosFormModel {
  imgIDA: string;
  imgIDB: string;
  imgBankbook: string;
  imgRegTranscript: string;
  passed: boolean;
}
export interface IDPhotosFCsModel {
  imgIDA: AbstractControl;
  imgIDB: AbstractControl;
  imgBankbook: AbstractControl;
  imgRegTranscript: AbstractControl;
  passed: AbstractControl;
}
