import { AbstractControl } from '@angular/forms';
import { HospDataHCProgram } from 'src/app/api/models/get-hosp-data.models';
import { YN } from '../../enums/yn.enum';

export interface UpdateHCProgramDialogData {
  program: HospDataHCProgram;
}

export interface UpdateHCProgramFormModel {
  name: string;
  description: string;
  charge: number;
  enabled: YN;
}
export interface UpdateHCProgramFCsModel {
  name: AbstractControl;
  description: AbstractControl;
  charge: AbstractControl;
  enabled: AbstractControl;
}

export type UpdateHCProgramDialogResult = boolean | undefined;
