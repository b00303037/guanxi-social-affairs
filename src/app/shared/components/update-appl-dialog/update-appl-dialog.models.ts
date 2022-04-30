import { AbstractControl } from '@angular/forms';
import { HospData } from 'src/app/api/models/get-hosp-data.models';
import { Settings } from 'src/app/api/models/get-settings.models';
import { Genders } from 'src/app/shared/enums/gender.enum';

export interface UpdateApplDialogData {
  applicationID: string;
  hospData: HospData;
  settings: Settings;
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
}
export interface IDPhotosFCsModel {
  imgIDA: AbstractControl;
  imgIDB: AbstractControl;
  imgBankbook: AbstractControl;
  imgRegTranscript: AbstractControl;
}

export type UpdateApplDialogResult = boolean | undefined;
